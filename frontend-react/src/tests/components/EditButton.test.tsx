import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EditButton from "../../components/EditButton";
import { Recipe } from "../../types/Recipes";
import { useNavigate } from "react-router-dom";
import {CreateButton} from "../../components/EditButton";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("EditButton Component", () => {
    const recipe: Recipe = {
        id: 1,
        title: "Burger",
        description: "schmeckt gut",
        imgUri: "test.jpg",
        isPrivate: false,
        creationDate: new Date(),
        ownerUri: "/users/1",
        likedByUserUris: [],
        products: []
    };

    test("navigates to the correct URL on click", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);


        const { asFragment } = render(<EditButton Recipe={recipe} />);

        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);

        expect(navigate).toHaveBeenCalledWith("/recipe/edit/1");
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("CreateButton Component", () => {
    test("navigates to the correct link on click", () => {
        const navigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(navigate);

        const { asFragment } = render(<CreateButton Link={"./new"} />);

        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);

        expect(navigate).toHaveBeenCalledWith("./new");
        expect(asFragment()).toMatchSnapshot();
    });

    test("renders the correct text", () => {
        render(<CreateButton Link={"./new"} />);
        expect(screen.getByText("Erstelle neue Umfrage")).toBeInTheDocument();
    });
});
