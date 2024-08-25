import React from "react";
import {render, screen, within} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import IngredientsTable from "../../components/IngredientsTable";

describe("IngredientsTable Component", () => {
    const ingredients = [
        {
            name: "Test Ingredient",
            amount: 1,
            unit: "kg"
        }
    ];

    test("renders the correct ingredients", () => {
        const {asFragment} = render(<IngredientsTable ingredients={ingredients} />);

        const tableElement = screen.getByRole("table");
        expect(tableElement).toBeInTheDocument();

        const headRowElement = screen.getAllByRole("row")[0];
        expect(headRowElement).toBeInTheDocument();

        const headDataElements = within(headRowElement).getAllByRole("columnheader");
        expect(headDataElements).toHaveLength(2);
        expect(headDataElements[0]).toHaveTextContent("Zutat");
        expect(headDataElements[1]).toHaveTextContent("Menge");

        const bodyRowElement = screen.getAllByRole("row")[1];
        expect(bodyRowElement).toBeInTheDocument();

        const bodyDataElements = within(bodyRowElement).getAllByRole("cell");
        expect(bodyDataElements).toHaveLength(2);
        expect(bodyDataElements[0]).toHaveTextContent("Test Ingredient");
        expect(bodyDataElements[1]).toHaveTextContent("1 kg");
        
        expect(asFragment()).toMatchSnapshot();
    });
});
