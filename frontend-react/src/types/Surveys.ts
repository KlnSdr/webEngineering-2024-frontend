import {Recipe} from "./Recipes";

interface Survey{
    id: number;
    title: string;
    participants: string[];
    creator: string;
    recipeVote: {[key: string]: number};
    options: string[];
    creationDate: Date;
}

interface UpdateSurvey {
    id: number;
    title: string;
    participants: string[];
    creator: string;
    recipeVote: {[key: string]: number};
    options: Recipe[];
    creationDate: Date;
}

interface CreateSurvey {
    title: string;
    options: Recipe[];
}

export type {Survey, CreateSurvey,UpdateSurvey};

