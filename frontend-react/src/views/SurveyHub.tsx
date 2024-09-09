import React, {useEffect, useState} from 'react';
import {Survey} from "../types/Surveys";
import SurveyService from "../services/SurveyService";
import "../style/SurveyHub.css";
import {Link} from "react-router-dom";
import EditButton, {CreateButton} from "../components/EditButton";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

/**
 * Component for displaying and managing user surveys.
 *
 * This component fetches and displays the surveys created by the logged-in user.
 * It allows the user to create new surveys, edit existing ones, and delete surveys.
 *
 * @returns {JSX.Element} The rendered component.
 */
function SurveyHub(){
    const [surveys, setSurveys] = useState<Survey[] | null>(null);

    useEffect(() => {
        SurveyService.getSurveysByUserId().then((surveys) => {
            if(surveys){
                setSurveys(surveys);
            }
        }).catch((error) => {
            console.error("Failed to load surveys", error);
        });
    }, []);

    /**
     * Determines the appropriate text size class based on the length of the survey title.
     *
     * @param {string} title - The title of the survey.
     * @returns {string} The CSS class for the text size.
     */
    function textsize(title: string | any ){
        if (title.length > 45){
            return "display-6";
        }else if (title.length > 35){
            return "display-5";
        }
        else if(title.length > 25){
            return "display-4";
        }else if(title.length > 10){
            return "display-3";
        }
        return "display-2";
    }

    /**
     * Deletes a survey by its ID and updates the survey list.
     *
     * @param {number} id - The ID of the survey to delete.
     */
    const deleteSurvey = (id: number) => {
        SurveyService.deleteSurvey(id).then(() => {
            SurveyService.getSurveysByUserId().then((surveys) => {
                if(surveys){
                    setSurveys(surveys);
                }
            }).catch((error) => {
                console.error("Failed to load surveys", error);
            });
        }).catch((error) => {
            console.error("Failed to delete survey", error);
        });
    }

    if(!surveys){
        return(
            <div>
                <h1>Hier könnten Ihre Umfragen stehen, aber Sie sind nicht angemeldet!</h1>
            </div>
        );
    }

    if(surveys.length === 0 ){
        return(
            <div>
                <h1>Erstellen Sie Ihre erste Umfrage, Sie haben noch keine!</h1>
                <CreateButton Link={"./new"}/>
            </div>
        );
    }

    return(
        <div>
            <h1>Meine Umfragen</h1>
            <CreateButton Link={"./new"}/>
            {surveys.map((survey, index) => (
                <Stack direction="horizontal" gap={3}>
                <div key={index} className="TextArea align-content-center mt-3">
                    <Link to ={`./view/${survey.id}`}><h2 className={textsize(survey.title)}>{survey.title}</h2></Link>
                </div>
                    <div className="col-1">
                        <EditButton Link={`/survey/edit/${survey.id}`}/>
                        <Button variant="danger" className={"bi bi-x m-2"} onClick={()=> deleteSurvey(survey.id)}></Button>
                    </div>
                </Stack>
            ))}
        </div>
    );
}

export default SurveyHub;