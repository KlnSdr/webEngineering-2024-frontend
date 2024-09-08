import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import SearchView from "../../views/SearchView";
import {ProductsService} from "../../services/ProductService";
import {RecipeService} from "../../services/RecipeService";
import RecipeDetailView from "../../views/RecipeDetailView";


describe('SearchView', () => {

    it('matches snapshot ', () => {

        const { asFragment } = render(
            <MemoryRouter initialEntries={["/search"]}>
                <RecipeDetailView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

});
