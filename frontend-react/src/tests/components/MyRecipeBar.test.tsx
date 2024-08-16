import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import MyRecipeBar from "../../components/MyRecipeBar";
import {CreateRecipe} from "../../types/Recipes";

describe("MyRecipeBar Component", () => {
    const recipe: CreateRecipe = {
        title: "Test Recipe",
        image: null,
        description: "This is a test recipe",
        products: [],


    };

    test("renders with correct recipe title", () => {
        render(<MyRecipeBar CreateRecipe={recipe} />);

        const titleElement = screen.getByRole("heading", { level: 2 });
        expect(titleElement).toHaveTextContent(recipe.title);

    });
});
