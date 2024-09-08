import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import SearchView from "../../views/SearchView";

describe('SearchView', () => {

    it('matches snapshot ', () => {

        const { asFragment } = render(
            <MemoryRouter initialEntries={["/search"]}>
                <SearchView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

});
