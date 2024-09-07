import React, {useEffect, useState} from 'react';
import {Survey} from "../types/Surveys";
import SurveyService from "../services/SurveyService";
import "../style/SurveyHub.css";
import {Link} from "react-router-dom";
import EditButton, {CreateButton} from "../components/EditButton";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

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

    function textsize(title: string | any ){
        console.log(title, title.length);
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
                <h1>Hier könnten deine Umfragen stehen aber du hast keine!!</h1>
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