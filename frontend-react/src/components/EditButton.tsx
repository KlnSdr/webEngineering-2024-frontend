import React from "react";
import {CreateRecipe} from "../types/Recipes";
import Button from "react-bootstrap/Button";

interface EditButtonProps {
    CreateRecipe: CreateRecipe;
}

const EditButton: React.FC<EditButtonProps> = ({CreateRecipe}) => {
    return (
        <div className="EditButton">
            <Button className="bi bi-pencil" onClick={() => console.log(CreateRecipe)}>Edit</Button>
        </div>
    );
};

export default EditButton;




