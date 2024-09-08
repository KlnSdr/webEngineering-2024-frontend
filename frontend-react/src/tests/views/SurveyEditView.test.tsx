import React from "react";
import {render} from "@testing-library/react";
import SurveyEditView from "../../views/SurveyEditView";
import {UserService} from "../../services/UserService";
import {MemoryRouter} from "react-router-dom";

jest.mock("../../services/UserService");

const mockIsLoggedIn = UserService.isLoggedIn as jest.Mock;

describe("SurveyEditView Component", () => {

    test('matches snapshot for SurveyEditView component if user is logged in', () => {
        mockIsLoggedIn.mockResolvedValue(true);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/survey/edit/:id"]}>
                <SurveyEditView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('matches snapshot for SurveyEditView component if user is not logged in', () => {
        mockIsLoggedIn.mockResolvedValue(false);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/survey/edit/:id"]}>
                <SurveyEditView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

})