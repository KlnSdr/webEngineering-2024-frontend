import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeEditView from "../../views/RecipeEditView";
import {RecipeService} from "../../services/RecipeService";
import {ProductsService} from "../../services/ProductService";

jest.mock("../../services/ProductService");
jest.mock("../../services/RecipeService");

const mockRecipes = RecipeService.getRecipeById as jest.Mock;
const mockProducts = ProductsService.getAll as jest.Mock;

const mockRecipeTest = [{id: 1, title: "Test Recipe", description: "Test", imgUri: "/image.jpg",
isPrivate: false, creationDate: new Date(), ownerUri: "/user1", likedByUserUris: ["/user1"],
    products: [
        { id: 1, name: "One", amount: 50, unit: "g" },
    ]}];
const mockProductTest = [{ id: 1, name: "One", amount: 50, unit: "g" }];

describe("RecipeEditView Component", () => {

    test('matches snapshot for RecipeEditView component if user is logged in', () => {

        (mockProducts as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProductTest,
        });
        (mockRecipes as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockRecipeTest,
        });
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/edit/1"]}>
                <RecipeEditView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('matches snapshot for RecipeEditView component if user is not logged in', () => {

        (mockProducts as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProductTest,
        });
        const mockError = new Error("Failed to load recipe edit view");
        (mockRecipes as jest.Mock).mockRejectedValueOnce(mockError);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/recipes/edit/1"]}>
                <RecipeEditView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

});
