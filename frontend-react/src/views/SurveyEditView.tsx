import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Survey} from "../types/Surveys";
import SurveyService from "../services/SurveyService";

function SurveyEditView() {

    const {id} = useParams<{id:string}>();
    const[survey, setSurvey] = useState<Survey | null>(null);

    useEffect(() => {
        SurveyService.getSurveyById(id).then((survey) => {
            if(survey){
                setSurvey(survey);
            }
        }).catch((error) => {
            console.error("Failed to load survey", error);
        });
    }, [id]);

  return (
    <div>
      <h1>SurveyEditView</h1>
    </div>
  );
}

export default SurveyEditView;