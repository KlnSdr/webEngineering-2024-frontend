import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import SurveyDetailView from "../../views/SurveyDetailView";
import SurveyService from "../../services/SurveyService";

jest.mock("../../services/SurveyService");

const mockSurveys = SurveyService.getSurveyById as jest.Mock;
const mockSurveyTest = [{id: 1, title: "Test Survey", participants: ["user1" , "user2"],
    creator: "user1", recipeVote: {"recipe1" : 1},
    options: ["recipe1", "recipe2"], creationDate: new Date() }];

describe("SurveyDetailView Component", () => {

    test('matches snapshot for SurveyDetailView component if user is logged in', () => {

        (mockSurveys as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockSurveyTest,
        });

        const { asFragment } = render(
            <MemoryRouter initialEntries={["/survey/view/:id"]}>
                <SurveyDetailView />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('matches snapshot for SurveyDetailView component if user is not logged in', () => {

        const mockError = new Error("Failed to load survey detail view");
        (mockSurveys as jest.Mock).mockRejectedValueOnce(mockError);
            const {asFragment} = render(
                <MemoryRouter initialEntries={["/survey/view/:id"]}>
                    <SurveyDetailView/>
                </MemoryRouter>
            );

            expect(asFragment()).toMatchSnapshot();
    });

});
