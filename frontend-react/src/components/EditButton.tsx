import React from "react";
import {Recipe} from "../types/Recipes";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
    Recipe: Recipe;
}

interface CreateButtonProps {
    Link: string;
}

const EditButton: React.FC<EditButtonProps> = ({Recipe}) => {
    const navigate = useNavigate();
    return(
        <div className="EditButton">
            <Button className="bi bi-pencil" onClick= {() => navigate("/recipe/edit/" + Recipe.id)}> Edit</Button>
        </div>
    );
}

const CreateButton: React.FC<CreateButtonProps> = ({Link}) => {
    const navigate = useNavigate();
    return (
        <div className="CreateButton">
            <Button className="bi bi-plus" onClick={() => navigate(Link)}>Erstelle neue Umfrage</Button>
        </div>
    );
}

export default EditButton;
export {CreateButton};




