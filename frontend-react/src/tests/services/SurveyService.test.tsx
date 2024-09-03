import SurveyService from "../../services/SurveyService";

global.fetch = jest.fn();

describe("SurveyService", () => {
    const mockResponse = { message: "Survey saved successfully" };
    const mockSurveys = [
        {
            id: 1,
            title: "Survey 1",
            participants: ["user1", "user2"],
            creator: "creator1",
            recipeVote: { "/recipes/1": 10, "/recipes/2": 5 },
            options: ["/recipes/1", "/recipes/2"],
            creationDate: new Date("2024-01-01"),
        },
        {
            id: 2,
            title: "Survey 2",
            participants: ["user3", "user4"],
            creator: "creator2",
            recipeVote: { "/recipes/3": 7, "/recipes/4": 3 },
            options: ["/recipes/3", "/recipes/4"],
            creationDate: new Date("2024-02-01"),
        },
    ];

    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    test("getSurveyById resolves successfully with valid survey", async () => {
        const surveyId = 1;
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockSurveys[0],
        });

        const survey = await SurveyService.getSurveyById(surveyId);
        expect(survey).toEqual(mockSurveys[0]);
    });

    test("getSurveyById throws error with invalid survey", async () => {
        const surveyId = 999;
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: "Not Found",
        });

        await expect(SurveyService.getSurveyById(surveyId)).rejects.toThrow("Failed to load survey.");
    });

    test("voteSurvey resolves successfully with updated survey", async () => {
        const surveyId = 1;
        const recipeId = 1;
        const updatedSurvey = { ...mockSurveys[0], recipeVote: { "/recipes/1": 11, "/recipes/2": 5 } };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => updatedSurvey,
        });

        const survey = await SurveyService.voteSurvey(surveyId, recipeId);
        expect(survey).toEqual(updatedSurvey);
    });

    test("voteSurvey throws error with invalid survey", async () => {
        const surveyId = 999;
        const recipeId = 1;
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: "Not Found",
        });

        await expect(SurveyService.voteSurvey(surveyId, recipeId)).rejects.toThrow("Failed to vote");
    });
});