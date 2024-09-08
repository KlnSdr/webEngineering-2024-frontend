import React, {useEffect, useState} from "react";
import "../style/CreateRecipeView.css";
import {UserService} from "../services/UserService";
import {Link, useNavigate} from "react-router-dom";
import LabelInput from "../components/LabelInput";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import RecipeSearch from "../components/RecipeSearch";
import Heading from "../components/Heading";
import ImageArea from "../components/ImageArea";
import MyRecipeBar from "../components/MyRecipeBar";
import {CreateSurvey, Survey, UpdateSurvey} from "../types/Surveys";
import {Recipe} from "../types/Recipes";
import Alert from "react-bootstrap/Alert";
import SurveyService from "../services/SurveyService";

function CreateSurveyView({survey}: { survey: UpdateSurvey | null}) {

    const emptySurvey: CreateSurvey = {
        title: "", options: []
    };
    if (survey) {
        emptySurvey.title = survey.title;
        emptySurvey.options = survey.options;
    }
    const popUpTimeout: number = parseInt(process.env.REACT_APP_POPUP_TIMEOUT || "5000");
    const [showFailAlert, setShowFailAlert] = useState(false);
    const [state, setState] = useState<CreateSurvey>(emptySurvey);

    const navigate = useNavigate();
    useEffect(() => {
        UserService.isLoggedIn().then((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
                navigate("/login");
            }
        });
    }, [navigate]);

    const addRecipeToOptions = (recipe: Recipe) => {
        setState({...state, options: [...state.options, recipe]});
    };

    const removeFromOptions = (index: number) => {
        const newOptions = [...state.options];
        newOptions.splice(index, 1);
        setState({...state, options: newOptions});
    };

    const validate: () => boolean = () => {
        if (state.title.trim() === "") {
            return false;
        }
        return state.options.length >= 2;

    };

    const saveSurvey = () => {
        if (!validate()) {
            showPopUpFail();
            return;
        }
        if (survey) {
            const surveyUpdate : Survey={
                id: survey.id,
                title: state.title,
                options: state.options.map((recipe: any) => `/recipes/${recipe.id}`),
                creator: survey.creator,
                creationDate: survey.creationDate,
                participants: survey.participants,
                recipeVote: survey.recipeVote
            }
            SurveyService.updateSurvey(surveyUpdate)
                .then((updatedSurvey) => {
                    window.location.assign(`/survey/view/${updatedSurvey.id}`);
                })
                .catch(() => {
                    showPopUpFail();
                });
            return
        }
        SurveyService.createSurvey(state)
            .then((createdSurvey: Survey) => {
                window.location.assign(`/survey/view/${createdSurvey.id}`);
            })
            .catch(() => {
                showPopUpFail();
            });
    };

    const showPopUpFail = () => {
        setShowFailAlert(true);
        setTimeout(() => setShowFailAlert(false), popUpTimeout);
    };

    return (<div>
        {showFailAlert && (<Alert
            variant="danger"
            onClose={() => setShowFailAlert(false)}
            dismissible
            className={"fixed-top"}
        >
            Umfrage konnte nicht erstellt werden!
        </Alert>)}
        <LabelInput
            labelText="Title"
            initialValue={state.title}
            onChange={(val: string) => {
                setState({...state, title: val});
            }}
        />
        <RecipeSearch onAdd={addRecipeToOptions}/>
        <Heading headingText={"Rezepte"}/>
        {state.options.map((recipe, index) => (
            <Stack direction={"horizontal"}>
                <ImageArea origin={recipe.imgUri}/>
                <Link to={`/recipe/view/${recipe.id}`}>
                    <MyRecipeBar Recipe={recipe}/>
                </Link>
                <Button variant="danger" className={"bi bi-x"} onClick={() => removeFromOptions(index)}></Button>
            </Stack>
        ))}
        <Stack direction="horizontal">
            <Button
                variant="secondary"
                onClick={() => {
                    if(survey) {
                        navigate(`/survey/`);
                    }
                    setState(emptySurvey);
                }}
                className="ms-auto"
            >
                verwerfen
            </Button>
            <Button variant="primary" onClick={() => {
                saveSurvey();
            }}>
                speichern
            </Button>
        </Stack>
    </div>);
}

export default CreateSurveyView;
