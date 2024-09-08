import {CreateSurvey, Survey} from "../types/Surveys";
import {authorizedRequest} from "./Requests";

class SurveyService {
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    public static getSurveysByUserId(): Promise<any[]> {
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

    public static getSurveyById(surveyId: string | undefined): Promise<Survey> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/surveys/${surveyId}`).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to load survey.");
                }
                return response.json();
            }).then((data: Survey) => {
                console.log(data);
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }
    public static voteSurvey(surveyId: number, recipeId: number): Promise<Survey>{
        return new Promise((resolve, reject) =>{
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