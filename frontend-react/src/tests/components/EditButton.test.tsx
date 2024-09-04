import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import EditButton from "../../components/EditButton";
import {CreateButton} from "../../components/EditButton";
import {Recipe} from "../../types/Recipes";
import {useNavigate} from "react-router-dom";

describe("EditButton Component", () => {
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

    test("logs the correct recipe on click", () => {
        console.log = jest.fn();

        const {asFragment} = render(<EditButton Recipe={recipe} />);

        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);

        expect(console.log).toHaveBeenCalledWith(recipe);
        expect(asFragment()).toMatchSnapshot();
    });
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

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
