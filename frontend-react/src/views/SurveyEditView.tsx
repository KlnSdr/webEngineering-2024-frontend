import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Survey, UpdateSurvey} from "../types/Surveys";
import SurveyService from "../services/SurveyService";
import CreateSurveyView from "./CreateSurveyView";

/**
 * Component for editing an existing survey.
 *
 * This component fetches the details of a survey by its ID and displays the
 * `CreateSurveyView` component pre-filled with the survey's data for editing.
 *
 * @returns {JSX.Element} The rendered component.
 */
function SurveyEditView() {

    const {id} = useParams<{id:string}>();
    const[survey, setSurvey] = useState<Survey>();
    const backendURL: string = process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    useEffect(() => {
        SurveyService.getSurveyById(id).then((survey) => {
            if(survey){
                setSurvey(survey);
            }
        }).catch((error) => {
            console.error("Failed to load survey", error);
        });
    }, [id]);

    /**
     * Makes a synchronous GET request to the specified URL.
     *
     * @param {string | URL} url - The URL to send the request to.
     * @returns {string} The response from the server.
     * @throws Will throw an error if the request fails.
     */
    function makeSynchronousCall(url: string | URL) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        if (xhr.status === 200) {
            return xhr.response;
        } else {
            throw new Error(`Request failed with status ${xhr.status}`);
        }
    }

    /**
     * Prepares the survey data for editing.
     *
     * @returns {UpdateSurvey} The survey data formatted for editing.
     */
    const gEdit = () => {
        const editSurvey: UpdateSurvey = {
            title: survey!.title,
            options: [],
            id: survey!.id,
            creator: survey!.creator,
            creationDate: survey!.creationDate,
            participants: survey!.participants,
            recipeVote: survey!.recipeVote
        };

        let recipeIds = survey?.options.map(option => option.replace("/recipes/", ""));
        if (recipeIds) {
            editSurvey.options = recipeIds.map(id => {
                try {
                    return JSON.parse(makeSynchronousCall(`${backendURL}/recipes/${id}`));
                } catch (error) {
                    console.error("Failed to fetch recipes", error);
                    return null;
                }
            });
        }
        return editSurvey;
    };

    if (survey === null || survey === undefined) {
        return <div>Umfrage mit Id {id} konnte nicht gefunden werden.</div>
    } else {
        return (
            <div>
                <CreateSurveyView survey={gEdit()}/>
            </div>
        );
    }
}

export default SurveyEditView;