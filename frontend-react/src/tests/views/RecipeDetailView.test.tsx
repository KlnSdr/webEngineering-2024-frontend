import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeDetailView from "../../views/RecipeDetailView"; // For simulating routing

describe("RecipeDetailView Component", () => {
    test('matches snapshot', () => {

        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/view/:id"]}>
                <RecipeDetailView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

});
