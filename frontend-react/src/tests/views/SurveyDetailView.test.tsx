import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import { UserService } from "../../services/UserService";
import RecipeDetailView from "../../views/RecipeDetailView";
import SurveyDetailView from "../../views/SurveyDetailView";

jest.mock("../../services/UserService");

const mockIsLoggedIn = UserService.isLoggedIn as jest.Mock;

describe("RecipeEditView Component", () => {

    test('matches snapshot for SurveyDetailView component if user is logged in', () => {
        mockIsLoggedIn.mockResolvedValue(true);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/survey/view/:id"]}>
                <SurveyDetailView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('matches snapshot for SurveyDetailView component if user is not logged in', () => {
        mockIsLoggedIn.mockResolvedValue(false);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/survey/view/:id"]}>
                <SurveyDetailView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

});
