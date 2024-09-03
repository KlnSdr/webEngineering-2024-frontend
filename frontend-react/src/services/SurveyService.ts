import {CreateSurvey, Survey} from "../types/Surveys";;

class SurveyService {
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    public static getSurveysByUserId(userId: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            fetch(`${this.backendURL}/surveys/user/${userId}`).then((response: Response) => {
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
            fetch(`${this.backendURL}/surveys/${surveyId}`, {credentials: "include"}).then((response: Response) => {
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
            fetch(`${this.backendURL}/surveys/${surveyId}/vote/${recipeId}`, {
                method: "PUT",
                credentials: "include",
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

    public static createSurvey(survey: CreateSurvey): Promise<void> {
        const surveyToSend = {
            title: survey.title,
            options: survey.options.map((recipe: any) => `/recipes/${recipe.id}`),
        };

        return new Promise((resolve, reject) => {
            fetch(`${this.backendURL}/surveys`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(surveyToSend),
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Could not save survey.");
                }
                return response.json();
            }).then((data: any) => {
                console.log(data);
                resolve();
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }
}

export default SurveyService;