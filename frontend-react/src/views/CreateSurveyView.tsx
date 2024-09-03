import {useEffect, useState} from "react";
import "../style/CreateRecipeView.css";
import {UserService} from "../services/UserService";
import {useNavigate} from "react-router-dom";
import LabelInput from "../components/LabelInput";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import RecipeSearch from "../components/RecipeSearch";

function CreateSurveyView() {
    const emptySurvey = {
        title: "", options: []
    };
    const [state, setState] = useState(emptySurvey);

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
