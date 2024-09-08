import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateRecipeView from "../../views/CreateRecipeView";
import { UserService } from "../../services/UserService";

jest.mock("../../services/UserService");

const mockIsLoggedIn = UserService.isLoggedIn as jest.Mock;

describe("CreateRecipeView Component", () => {

    it("redirects to login if user is not logged in", async () => {
        mockIsLoggedIn.mockResolvedValue(false);
        render(
            <Router>
                <CreateRecipeView recipe={null} />
            </Router>
        );
        await waitFor(() => expect(window.location.pathname).toBe("/login"));
    });

    it("renders correctly when user is logged in and matches snapshot", async () => {
        mockIsLoggedIn.mockResolvedValue(true);
        const { asFragment } = render(
            <Router>
                <CreateRecipeView recipe={null} />
            </Router>
        );
        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
