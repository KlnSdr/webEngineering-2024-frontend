import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductsService } from "../../services/ProductService";
import { request } from "../../services/Requests";
import EditRecipeView from "../../views/RecipeEditView";
import RecipeDetailView from "../../views/RecipeDetailView";
import {UserService} from "../../services/UserService";

jest.mock("../../services/UserService");

const mockIsLoggedIn = UserService.isLoggedIn as jest.Mock;

describe("RecipeEditView Component", () => {

    test('matches snapshot for RecipeEditView component if user is logged in', () => {
        mockIsLoggedIn.mockResolvedValue(true);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/edit/:id"]}>
                <RecipeDetailView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('matches snapshot for RecipeEditView component if user is not logged in', () => {
        mockIsLoggedIn.mockResolvedValue(false);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/edit/:id"]}>
                <RecipeDetailView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

});
