import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {UserService} from "../../services/UserService";
import RecipeEditView from "../../views/RecipeEditView";

jest.mock("../../services/UserService");

const mockIsLoggedIn = UserService.isLoggedIn as jest.Mock;

describe("RecipeEditView Component", () => {

    test('matches snapshot for RecipeEditView component if user is logged in', () => {
        mockIsLoggedIn.mockResolvedValue(true);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/edit/:id"]}>
                <RecipeEditView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('matches snapshot for RecipeEditView component if user is not logged in', () => {
        mockIsLoggedIn.mockResolvedValue(false);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/edit/:id"]}>
                <RecipeEditView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

});
