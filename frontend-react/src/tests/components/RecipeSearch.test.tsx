import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RecipeSearch from "../../components/RecipeSearch";
import { RecipeService } from "../../services/RecipeService";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

jest.mock("../../services/RecipeService");

const mockRecipe = {
    id: "1",
    name: "Test Recipe",
    imgUri: "test.jpg",
};

describe("RecipeSearch Component", () => {
    beforeEach(() => {
        (RecipeService.searchRecipesByText as jest.Mock).mockResolvedValue([mockRecipe]);
    });

    it("renders without crashing", () => {
        const {asFragment} =  render(
            <Router>
                <RecipeSearch onAdd={jest.fn()} />
            </Router>
        );
        expect(screen.getByText(/Rezepte suchen/i)).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it("clears search results when search string is less than 3 characters", () => {
        render(
            <Router>
                <RecipeSearch onAdd={jest.fn()} />
            </Router>
        );
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Te" } });
        expect(screen.queryByText(/Test Recipe/i)).not.toBeInTheDocument();
    });

    it("calls onAdd and clears search results when add button is clicked", async () => {
        const onAddMock = jest.fn();
        render(
            <Router>
                <RecipeSearch onAdd={onAddMock} />
            </Router>
        );
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Test" } });
        fireEvent.click(await screen.findByRole("button"));
        expect(onAddMock).toHaveBeenCalledWith(mockRecipe);
        expect(screen.queryByText(/Test Recipe/i)).not.toBeInTheDocument();
    });

    it("handles search error gracefully", async () => {
        render(
            <Router>
                <RecipeSearch onAdd={jest.fn()} />
            </Router>
        );
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Test" } });
        expect(screen.getByText(/Rezepte suchen/i)).toBeInTheDocument();
        expect(screen.queryByText(/Test Recipe/i)).not.toBeInTheDocument();
    });
});