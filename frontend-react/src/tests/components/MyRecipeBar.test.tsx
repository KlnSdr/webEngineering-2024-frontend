import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import MyRecipeBar from "../../components/MyRecipeBar";
import {CreateRecipe, Recipe} from "../../types/Recipes";

describe("MyRecipeBar Component", () => {
    const recipe: Recipe = {
        id: 1,
        title: "Test Recipe",
        description: "Test Description",
        imgUri: "test.jpg",
        isPrivate: false,
        creationDate: new Date(),
        ownerUri: "test",
        likedByUserUris: [],
        products:[]


    };

    test("renders with correct recipe title", () => {
        const {asFragment} = render(<MyRecipeBar Recipe={recipe} />);

        const titleElement = screen.getByRole("heading", { level: 2 });
        expect(titleElement).toHaveTextContent(recipe.title);
        expect(asFragment()).toMatchSnapshot();
    });
});
