import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SurveyDetailView from "../../views/SurveyDetailView";
import { UserService } from "../../services/UserService";
import { Survey } from "../../types/Surveys";
import { User } from "../../types/Users";
import SurveyService from "../../services/SurveyService";

jest.mock("../../services/SurveyService");
jest.mock("../../services/RecipeService");
jest.mock("../../services/UserService");

const mockGetSurveyById = SurveyService.getSurveyById as jest.Mock;
const mockGetUser = UserService.getUser as jest.Mock;

describe("SurveyDetailView Component", () => {
    const mockSurvey: Survey = {
        id: 1,
        title: "Test Survey",
        participants: ["User1", "User2"],
        creator: "User1",
        recipeVote: {
            "recipe1": 2,
            "recipe2": 0,
        },
        options: ["recipe1", "recipe2"],
        creationDate: new Date()
    };


    const mockUser: User = {
        userId: 1,
        userName: "User1",
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("renders correctly with survey data", async () => {
        mockGetSurveyById.mockResolvedValue(mockSurvey);
        mockGetUser.mockResolvedValue(mockUser);

        const { asFragment } = render(
            <Router>
                <SurveyDetailView />
            </Router>
        );

        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });

});
