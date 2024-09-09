import React from "react";
import {render, waitFor} from "@testing-library/react";
import SurveyHub from "../../views/SurveyHub";
import {MemoryRouter} from "react-router-dom";
import SurveyService from "../../services/SurveyService";

jest.mock("../../services/SurveyService");

const mockSurveys = SurveyService.getSurveysByUserId as jest.Mock;
const mockSurveyTest = [{id: 1, title: "Test Survey", participants: ["user1" , "user2"],
    creator: "user1", recipeVote: {"recipe1" : 1},
    options: ["recipe1", "recipe2"], creationDate: new Date() }];

describe("SurveyHub Component", () => {

    test('matches snapshot for SurveyHub component if user is logged in', async () => {

        (mockSurveys as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockSurveyTest,
        });

            const {asFragment} = render(
                <MemoryRouter initialEntries={["/survey"]}>
                    <SurveyHub/>
                </MemoryRouter>
            );

            expect(asFragment()).toMatchSnapshot();
    });

    test('matches snapshot for SurveyHub component if user is not logged in', () => {

        const mockError = new Error("Failed to load surveys");
        (mockSurveys as jest.Mock).mockRejectedValueOnce(mockError);
            const { asFragment } = render(
                <MemoryRouter initialEntries={["/survey"]}>
                    <SurveyHub />
                </MemoryRouter>
            );

            expect(asFragment()).toMatchSnapshot();
    });
})