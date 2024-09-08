import React from "react";
import HomePage from "../../views/HomePage";
import { render, waitFor, screen } from "@testing-library/react";
import { UserService } from "../../services/UserService";
import { RecipeService } from "../../services/RecipeService";
import { FridgeService } from "../../services/FridgeService";
import { BrowserRouter as Router } from "react-router-dom";
import { Recipe } from "../../types/Recipes";
import { NeededProduct } from "../../types/Products";

jest.mock("../../services/UserService");
jest.mock("../../services/RecipeService");
jest.mock("../../services/FridgeService");

describe("HomePage Component", () => {

    it("matches snapshot for HomePage component if user is not logged in", async () => {
        jest.spyOn(UserService, "getUserInfo").mockResolvedValue(null);

        const { asFragment } = render(
            <Router>
                <HomePage />
            </Router>
        );

        await waitFor(() => expect(UserService.getUserInfo).toHaveBeenCalled());

        expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot for HomePage component if user is logged in", async () => {
        const mockUserInfo = { id: 1, name: "Test User" };
        jest.spyOn(UserService, "getUserInfo").mockResolvedValue(mockUserInfo);

        const mockRecipe: Recipe[] = [
            {
                id: 1,
                title: "Test Recipe",
                description: "Test Description",
                imgUri: "image.jpg",
                isPrivate: false,
                creationDate: new Date(),
                ownerUri: "user/1",
                likedByUserUris: ["user/2"],
                products: [
                    { id: 1, name: "One", amount: 50, unit: "g" },
                ],
            },
        ];
        jest.spyOn(RecipeService, "getRecipeByUser").mockResolvedValue(mockRecipe);

        const { asFragment } = render(
            <Router>
                <HomePage />
            </Router>
        );

        await waitFor(() => {
            expect(UserService.getUserInfo).toHaveBeenCalled();
            expect(RecipeService.getRecipeByUser).toHaveBeenCalledWith(mockUserInfo.id);
        });

        expect(asFragment()).toMatchSnapshot();
    });

});
