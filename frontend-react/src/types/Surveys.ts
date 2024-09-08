import { Recipe } from "./Recipes";

/**
 * Interface representing a survey.
 */
interface Survey {
    /**
     * The unique identifier of the survey.
     * @type {number}
     */
    id: number;

    /**
     * The title of the survey.
     * @type {string}
     */
    title: string;

    /**
     * The list of participants' identifiers.
     * @type {string[]}
     */
    participants: string[];

    /**
     * The creator's identifier.
     * @type {string}
     */
    creator: string;

    /**
     * The votes for each recipe, keyed by recipe identifier.
     * @type {{[key: string]: number}}
     */
    recipeVote: { [key: string]: number };

    /**
     * The list of option identifiers.
     * @type {string[]}
     */
    options: string[];

    /**
     * The creation date of the survey.
     * @type {Date}
     */
    creationDate: Date;
}

/**
 * Interface representing an update to a survey.
 */
interface UpdateSurvey {
    /**
     * The unique identifier of the survey.
     * @type {number}
     */
    id: number;

    /**
     * The title of the survey.
     * @type {string}
     */
    title: string;

    /**
     * The list of participants' identifiers.
     * @type {string[]}
     */
    participants: string[];

    /**
     * The creator's identifier.
     * @type {string}
     */
    creator: string;

    /**
     * The votes for each recipe, keyed by recipe identifier.
     * @type {{[key: string]: number}}
     */
    recipeVote: { [key: string]: number };

    /**
     * The list of recipe options.
     * @type {Recipe[]}
     */
    options: Recipe[];

    /**
     * The creation date of the survey.
     * @type {Date}
     */
    creationDate: Date;
}

/**
 * Interface representing the structure of a survey to be created.
 */
interface CreateSurvey {
    /**
     * The title of the survey.
     * @type {string}
     */
    title: string;

    /**
     * The list of recipe options.
     * @type {Recipe[]}
     */
    options: Recipe[];
}

export type { Survey, CreateSurvey, UpdateSurvey };