import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EditButton from "../../components/EditButton";
import {CreateRecipe, Recipe} from "../../types/Recipes";

describe("EditButton Component", () => {
    const recipe: Recipe = {
        id: 1,
        title: "Test Recipe",
        description: "Test Description",
        image: "test.jpg",
        isPrivate: false,
        creationDate: new Date(),
        ownerUri: "test",
        likedByUserUris: [],
        products:[]

    };

    test("logs the correct recipe on click", () => {
        console.log = jest.fn();

        render(<EditButton Recipe={recipe} />);

        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);

        expect(console.log).toHaveBeenCalledWith(recipe);
    });
});