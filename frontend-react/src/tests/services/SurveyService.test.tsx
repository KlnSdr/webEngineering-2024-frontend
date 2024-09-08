import SurveyService from "../../services/SurveyService";
import {Recipe} from "../../types/Recipes";

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
        const surveyId = "1";
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockSurveys[0],
        });

        const survey = await SurveyService.getSurveyById(surveyId);
        expect(survey).toEqual(mockSurveys[0]);
    });

    test("getSurveyById throws error with invalid survey", async () => {
        const surveyId = "999";
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

    test("delete survey resolves successfully", async () => {
        const surveyId = 1;
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        await expect(SurveyService.deleteSurvey(surveyId)).resolves.toEqual(undefined);
    });
    test("createSurvey resolves successfully with created survey", async () => {

        const recipes : Recipe[] = [
            {
                id: 5,
                title: "Käsesosse 1",
                description: "A delicious cheese sauce.",
                imgUri: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
                isPrivate: false,
                creationDate: new Date('2024-08-29T22:21:23.840Z'),
                ownerUri: "",
                likedByUserUris: [],
                products: [
                    { id: 1, name: "Cheese", amount: 1, unit: "kg" },
                    { id: 1, name: "Milk", amount: 1, unit: "l" },
                    { id: 1, name: "Butter", amount: 0.5, unit: "kg" }, // Adjusted unit to kg
                ],
            },
            {
                id: 6,
                title: "Käsesosse 2",
                description: "Cheese sauce with salt.",
                imgUri: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
                isPrivate: false,
                creationDate: new Date('2024-08-29T22:21:23.840Z'),
                ownerUri: "",
                likedByUserUris: [],
                products: [
                    { id: 1, name: "Cheese", amount: 2, unit: "kg" },
                    { id: 1, name: "Salt", amount: 0.1, unit: "kg" }, // Adjusted unit to kg
                    { id: 1, name: "Milk", amount: 2, unit: "l" },
                ],
            }];
        const survey = {
            title: "Survey 3",
            options: recipes
        };
        const createdSurvey = {
            title: "Survey 3",
            participants: [],
            creator: "creator3",
            recipeVote: {},
            options: ["/recipes/5", "/recipes/6"],
            creationDate: new Date(),
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => createdSurvey,
        });

        const response = await SurveyService.createSurvey(survey);
        expect(response).toEqual(createdSurvey);
    });

    test("createSurvey throws error with invalid survey", async () => {
        const survey = {
            title: "Survey 3",
            options: []
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: "Not Found",
        });

        await expect(SurveyService.createSurvey(survey)).rejects.toThrow("Could not save survey.");
    });

    test("updateSurvey resolves successfully with updated survey", async () => {
        const survey = {
            id: 1,
            title: "Survey 1",
            participants: ["user1", "user2"],
            creator: "creator1",
            recipeVote: { "/recipes/1": 10, "/recipes/2": 5 },
            options: ["/recipes/1", "/recipes/2"],
            creationDate: new Date("2024-01-01"),
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => survey,
        });

        const response = await SurveyService.updateSurvey(survey);
        expect(response).toEqual(survey);
    });

    test("updateSurvey throws error with invalid survey", async () => {
        const survey = {
            id: 999,
            title: "Survey 1",
            participants: ["user1", "user2"],
            creator: "creator1",
            recipeVote: { "/recipes/1": 10, "/recipes/2": 5 },
            options: ["/recipes/1", "/recipes/2"],
            creationDate: new Date("2024-01-01"),
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: "Not Found",
        });

        await expect(SurveyService.updateSurvey(survey)).rejects.toThrow("Could not update survey.");
    });

    test("delete survey throws error with invalid survey", async () => {
        const surveyId = 999;
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: "Not Found",
        });

        await expect(SurveyService.deleteSurvey(surveyId)).rejects.toThrow("Could not delete survey.");
    });

    test("getSurveysByUserId resolves successfully with valid surveys", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockSurveys,
        });

        const surveys = await SurveyService.getSurveysByUserId();
        expect(surveys).toEqual(mockSurveys);
    });

    test("getSurveysByUserId throws error with invalid surveys", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: "Not Found",
        });

        await expect(SurveyService.getSurveysByUserId()).rejects.toThrow("Failed to load surveys.");
    });
});