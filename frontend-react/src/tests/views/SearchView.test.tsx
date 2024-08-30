import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import SearchView from "../../views/SearchView";

describe('SearchView', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchView />
            </MemoryRouter>
        );

        // Check for static text elements
        expect(screen.getByText('Suche')).toBeInTheDocument();
        expect(screen.getByText('Produkte:')).toBeInTheDocument();
        expect(screen.getByText('Ergebnisse:')).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByRole('button', { name: /Produkt hinzufügen/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Suchen/i })).toBeInTheDocument();
    });

    it('adds a product line when "Produkt hinzufügen" button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchView />
            </MemoryRouter>
        );

        // Initially, there should be no product line elements
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

        // Click the "Produkt hinzufügen" button to add a new product line
        const addButton = screen.getByRole('button', { name: /Produkt hinzufügen/i });
        fireEvent.click(addButton);

        // Check that the select input is now rendered
        const selectInput = screen.getByRole('combobox');
        expect(selectInput).toBeInTheDocument();
    });

    it('removes a product line when "Remove" button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchView />
            </MemoryRouter>
        );

        // Add a product line to ensure there's something to remove
        const addButton = screen.getByRole('button', { name: /Produkt hinzufügen/i });
        fireEvent.click(addButton);

        // Ensure the product line is rendered
        const selectInput = screen.getByRole('combobox');
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

    it('displays static recipes when "Suchen" button is clicked', async () => {
        // Mocking fetch response with static recipes
        jest.mock('../../services/RecipeService', () => ({
            RecipeService: {
                searchRecipesByProducts: jest.fn().mockResolvedValue([
                    { id: 1, title: "Käsesosse 1", description: "A delicious cheese sauce.", image: "https://example.com/image1.jpg" },
                    { id: 2, title: "Käsesosse 2", description: "Cheese sauce with salt.", image: "https://example.com/image2.jpg" },
                    { id: 3, title: "Käsesosse 3", description: "A spicy cheese sauce.", image: "https://example.com/image3.jpg" },
                    { id: 4, title: "Käsesosse 4", description: "A mild cheese sauce.", image: "https://example.com/image4.jpg" },
                ]),
            },
        }));

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchView />
            </MemoryRouter>
        );

        // Simulate clicking the search button
        const searchButton = screen.getByRole('button', { name: /Suchen/i });
        fireEvent.click(searchButton);

        // Wait for recipes to be displayed
        await waitFor(() => {
            expect(screen.getByText("Käsesosse 1")).toBeInTheDocument();
            expect(screen.getByText("Käsesosse 2")).toBeInTheDocument();
            expect(screen.getByText("Käsesosse 3")).toBeInTheDocument();
            expect(screen.getByText("Käsesosse 4")).toBeInTheDocument();
        });
    });

});
