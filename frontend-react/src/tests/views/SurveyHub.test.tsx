import React from "react";
import {render} from "@testing-library/react";
import SurveyHub from "../../views/SurveyHub";
import {UserService} from "../../services/UserService";
import {MemoryRouter} from "react-router-dom";

jest.mock("../../services/UserService");

const mockIsLoggedIn = UserService.isLoggedIn as jest.Mock;

describe("SurveyHub Component", () => {

    test('matches snapshot for SurveyHub component if user is logged in', () => {
        mockIsLoggedIn.mockResolvedValue(true);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/survey"]}>
                <SurveyHub />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('matches snapshot for SurveyHub component if user is not logged in', () => {
        mockIsLoggedIn.mockResolvedValue(false);
        const { asFragment } = render(
            <MemoryRouter initialEntries={["/survey"]}>
                <SurveyHub />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
})