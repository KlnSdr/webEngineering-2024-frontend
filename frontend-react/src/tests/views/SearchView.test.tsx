import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import SearchView from "../../views/SearchView";
import {ProductsService} from "../../services/ProductService";
import {RecipeService} from "../../services/RecipeService";

// Mocking services
jest.mock("../../services/ProductService");
jest.mock("../../services/RecipeService");

describe('SearchView', () => {
    const mockProducts = [
        { id: 1, name: "Milk", unit: "liters" },
        { id: 2, name: "Eggs", unit: "pieces" },
    ];

    const mockRecipes = [
        { id: 1, title: "Käsesosse 1", imgUri: "image1.jpg" },
        { id: 2, title: "Käsesosse 2", imgUri: "image2.jpg" },
    ];

    const renderSearchView = () => {
        return render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchView />
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        (ProductsService.getAll as jest.Mock).mockResolvedValue(mockProducts);
        (RecipeService.searchRecipesByProducts as jest.Mock).mockResolvedValue(mockRecipes);
    });

    it('renders correctly', () => {
        const { asFragment } = renderSearchView();

        // Check for static text elements
        expect(screen.getByText('Suche')).toBeInTheDocument();
        expect(screen.getByText('Produkte:')).toBeInTheDocument();
        expect(screen.getByText('Ergebnisse:')).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByRole('button', { name: /Produkt hinzufügen/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Suchen/i })).toBeInTheDocument();

        // Snapshot test
        expect(asFragment()).toMatchSnapshot();
    });

    it('displays no products initially', () => {
        renderSearchView();
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('adds a product line when "Produkt hinzufügen" button is clicked', () => {
        renderSearchView();

        // Initially, there should be no product line elements
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

        // Click the "Produkt hinzufügen" button to add a new product line
        const addButton = screen.getByRole('button', { name: /Produkt hinzufügen/i });
        fireEvent.click(addButton);

        // Check that the select input is now rendered
        const selectInput = screen.getByRole('textbox');
        expect(selectInput).toBeInTheDocument();
    });

    it('removes a product line when "Remove" button is clicked', async () => {
        renderSearchView();

        // Add a product line to ensure there's something to remove
        const addButton = screen.getByRole('button', { name: /Produkt hinzufügen/i });
        fireEvent.click(addButton);

        // Ensure the product line is rendered
        const selectInput = screen.getByRole('textbox');
        expect(selectInput).toBeInTheDocument();

        // Locate the remove button
        const removeButtons = screen.getAllByRole('button');
        expect(removeButtons.length).toBeGreaterThan(0);

        // Find and click the remove button
        const removeButton = removeButtons.find(button => button.classList.contains('bi-x'));
        if (removeButton) {
            fireEvent.click(removeButton);
        } else {
            throw new Error('Remove button not found');
        }

        // Verify that the product line has been removed
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('renderes recipes when searching + when clicking on a recipe the detail view is opened', async () => {
        renderSearchView();

        // Simulate clicking the search button
        const searchButton = screen.getByRole('button', { name: /Suchen/i });
        fireEvent.click(searchButton);

        // Wait for recipes to be displayed
        await waitFor(() => {
            expect(screen.getByText("Käsesosse 1")).toBeInTheDocument();
            expect(screen.getByText("Käsesosse 2")).toBeInTheDocument();
        });

        const originalLocation = window.location;
        delete (window as any).location;  // Necessary to override the window.location object

        window.location = {
            ...originalLocation,
            assign: jest.fn(),  // Mock the assign method
        };

        const firstRecipeItem = screen.getByText("Käsesosse 1");
        fireEvent.click(firstRecipeItem);

        // Check if window.location.assign was called with the correct URL
        expect(window.location.assign).toHaveBeenCalledWith("/recipe/view/1");

        // Restore the original window.location object
        window.location = originalLocation;
    });

});
