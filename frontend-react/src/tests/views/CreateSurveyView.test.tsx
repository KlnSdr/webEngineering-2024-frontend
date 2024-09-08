import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateSurveyView from "../../views/CreateSurveyView";
import {UserService} from "../../services/UserService";

jest.mock("../../services/UserService");

describe("CreateSurveyView Component", () => {
    it("redirects to login if user is not logged in", async () => {
        (UserService.isLoggedIn as jest.Mock).mockResolvedValue(false);
        render(
            <Router>
                <CreateSurveyView survey={null} />
            </Router>
        );
        await waitFor(() => expect(window.location.pathname).toBe("/login"));
    });

    it("renders correct when user is logged in", async () => {
        (UserService.isLoggedIn as jest.Mock).mockResolvedValue(true);
        const {asFragment} = render(
            <Router>
                <CreateSurveyView survey={null} />
            </Router>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});