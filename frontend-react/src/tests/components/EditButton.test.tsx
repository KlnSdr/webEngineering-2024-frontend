import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EditButton from "../../components/EditButton";
import { CreateRecipe } from "../../types/Recipes";

describe("EditButton Component", () => {
    const recipe: CreateRecipe = {
        title: "Test Recipe",
        image: null,
        description: "This is a test recipe",
        products: [],
    };

    test("logs the correct recipe on click", () => {
        console.log = jest.fn();

        render(<EditButton CreateRecipe={recipe} />);

        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);

        expect(console.log).toHaveBeenCalledWith(recipe);
    });
});