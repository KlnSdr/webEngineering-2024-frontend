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
import {CreateSurvey} from "../types/Surveys";

function CreateSurveyView() {
    const emptySurvey: CreateSurvey = {
        title: "", options: []
    };
    const [state, setState] = useState<CreateSurvey>(emptySurvey);

    const navigate = useNavigate();
    useEffect(() => {
        UserService.isLoggedIn().then((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
                navigate("/login");
            }
        });
    }, [navigate]);

    return (<div>
        <LabelInput
            labelText="Title"
            initialValue={state.title}
            onChange={(val: string) => {
                setState({...state, title: val});
            }}
        />
        <RecipeSearch/>
        <Heading headingText={"Rezepte"}/>
        {state.options.map((recipe) => {
            return (<Stack direction={"horizontal"}>
                <ImageArea origin={recipe.imgUri}/>
                <Link to={`/recipe/view/${recipe.id}`}>
                    <MyRecipeBar Recipe={recipe}/>
                </Link>
            </Stack>);
        })}
        <Stack direction="horizontal">
            <Button
                variant="secondary"
                onClick={() => {
                }}
                className="ms-auto"
            >
                verwerfen
            </Button>
            <Button variant="primary" onClick={() => {
            }}>
                speichern
            </Button>
        </Stack>
    </div>);
}

export default CreateSurveyView;
