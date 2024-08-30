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

});
