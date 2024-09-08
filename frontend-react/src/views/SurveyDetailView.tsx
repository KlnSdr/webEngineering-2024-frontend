import "../style/SurveyView.css";
import React, {useEffect, useState} from "react";
import ImageArea from "../components/ImageArea";
import {RecipeService} from "../services/RecipeService";
import {Recipe} from "../types/Recipes";
import MyRecipeBar from "../components/MyRecipeBar";
import Stack from "react-bootstrap/Stack";
import {Heading2} from "../components/Heading";
import UncheckCheckbox from "../components/UncheckCheckbox";
import {Survey} from "../types/Surveys";
import SurveyService from "../services/SurveyService";
import {useParams} from "react-router-dom";
import {User} from "../types/Users";
import {UserService} from "../services/UserService";

/**
 * Component for displaying the details of a survey.
 *
 * This component fetches and displays the details of a survey, including its creator,
 * associated recipes, and vote counts. Users can vote on recipes within the survey.
 *
 * @returns {JSX.Element} The rendered component.
 */
function SurveyDetailView() {

    const [recipes, setRecipe] = useState<Recipe[]>([]);
    const [creator, setCreator] = useState<User | null>(null);
    const [survey, setSurvey] = useState<Survey | undefined>(undefined);
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        SurveyService.getSurveyById(id).then((survey) => {
            if (survey) {
                setSurvey(survey);
                recipeSet(survey);
                UserService.getUser(survey.creator)
                    .then(setCreator)
                    .catch(_ => {
                        setCreator({
                            userName: "could not load username",
                            userId: -1
                        });
                });
            }
        }).catch ((error) => {
            console.error("Failed", error);
        });
    }, [id]);

    /**
     * Fetches and sets the recipes associated with the survey.
     *
     * @param {Survey} survey - The survey object containing recipe URIs.
     */
    function recipeSet(survey: Survey) {
        let recipeIds = survey.options.map(option => option.replace("/recipes/", ""));
        Promise.all(recipeIds.map(id => RecipeService.getRecipeById(id)))
            .then(fetchedRecipes => {
                setRecipe(fetchedRecipes);
            })
            .catch(error => {
                console.error("Failed to fetch recipes", error);
            });
    }

    /**
     * Handles voting for a recipe within the survey.
     *
     * @param {number} surveyId - The ID of the survey.
     * @param {number} recipeUri - The URI of the recipe to vote for.
     */
    function handleVote(surveyId: number, recipeUri: number){
        SurveyService.voteSurvey(surveyId, recipeUri).then((survey) => {
            setSurvey(survey);
        });
    }

    /**
     * Gets the vote count for a specific recipe.
     *
     * @param {number} recipeId - The ID of the recipe.
     * @returns {number} The vote count for the recipe.
     */
    function getVoteCount(recipeId: number): number {
        if (survey && survey.recipeVote) {
            return survey.recipeVote[`/recipes/${recipeId}`] || 0;
        }
        return 0;
    }

    /**
     * Formats a date object into a string.
     *
     * @param {Date} date - The date to format.
     * @returns {string} The formatted date string.
     */
    function formatDate(date: Date): string {
        let time = new Date(date);
        const day = String(time.getDate()).padStart(2, '0');
        const month = String(time.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = time.getFullYear();
        return `${day}.${month}.${year}`;
    }

    if (!survey) {
        return <div>
            <Heading2 headingText={"Survey"}/>
            <h1>Survey not found</h1>
        </div>
    }
    return (
        <div>
            <Heading2 headingText={"Survey"}/>
            <div>
                <h1>{survey.title}</h1>
                Erstellt von {creator?.userName || ""} am {formatDate(survey.creationDate)}
            </div>

            <div className="container">
                {recipes.map((recipe, index) => (
                    <div key={index} className="container">
                        <div className="row mt-3">
                            <Stack direction={"horizontal"}>
                                <ImageArea origin={recipe.imgUri}/>
                                <MyRecipeBar Recipe={recipe}/>
                                {survey && (<UncheckCheckbox voteChange={() => handleVote(survey.id, recipe.id)} />)}
                                <div className="align-content-center"> Stimmen ---{'>'}  {getVoteCount(recipe.id)}</div>
                            </Stack>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SurveyDetailView;