import { CreateSurvey, Survey } from "../types/Surveys";
import { authorizedRequest } from "./Requests";

/**
 * Service class for handling survey-related operations.
 */
class SurveyService {
    /**
     * The backend URL for the survey service.
     * @type {string}
     * @private
     */
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    /**
     * Fetches surveys for the current user.
     * @returns {Promise<Survey[]>} A promise that resolves to an array of surveys.
     */
    public static getSurveysByUserId(): Promise<Survey[]> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/surveys/my`).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to load surveys.");
                }
                return response.json();
            }).then((data: Survey[]) => {
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }

    /**
     * Fetches a survey by its ID.
     * @param {string | undefined} surveyId - The ID of the survey.
     * @returns {Promise<Survey>} A promise that resolves to the fetched survey.
     */
    public static getSurveyById(surveyId: string | undefined): Promise<Survey> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/surveys/${surveyId}`).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to load survey.");
                }
                return response.json();
            }).then((data: Survey) => {
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }

    /**
     * Votes on a survey.
     * @param {number} surveyId - The ID of the survey.
     * @param {number} recipeId - The ID of the recipe to vote for.
     * @returns {Promise<Survey>} A promise that resolves to the updated survey.
     */
    public static voteSurvey(surveyId: number, recipeId: number): Promise<Survey> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/surveys/${surveyId}/vote/${recipeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to vote.");
                }
                return response.json();
            }).then((data: Survey) => {
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }

    /**
     * Creates a new survey.
     * @param {CreateSurvey} survey - The survey to create.
     * @returns {Promise<Survey>} A promise that resolves to the created survey.
     */
    public static createSurvey(survey: CreateSurvey): Promise<Survey> {
        const surveyToSend = {
            title: survey.title,
            options: survey.options.map((recipe: any) => `/recipes/${recipe.id}`),
        };

        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/surveys`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(surveyToSend),
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Could not save survey.");
                }
                return response.json();
            }).then((data: Survey) => {
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }

    /**
     * Updates an existing survey.
     * @param {Survey} survey - The survey to update.
     * @returns {Promise<Survey>} A promise that resolves to the updated survey.
     */
    public static updateSurvey(survey: Survey): Promise<Survey> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/surveys/${survey.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(survey),
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Could not update survey.");
                }
                return response.json();
            }).then((data: Survey) => {
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }

    /**
     * Deletes a survey by its ID.
     * @param {number} surveyId - The ID of the survey to delete.
     * @returns {Promise<void>} A promise that resolves when the survey is deleted.
     */
    public static deleteSurvey(surveyId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/surveys/${surveyId}`, {
                method: "DELETE",
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Could not delete survey.");
                }
                resolve();
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }
}

export default SurveyService;