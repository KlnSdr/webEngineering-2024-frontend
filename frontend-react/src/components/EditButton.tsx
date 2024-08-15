import React from "react";
import {CreateRecipe} from "../types/Recipes";

interface EditButtonProps {
    CreateRecipe: CreateRecipe;
}

const EditButton: React.FC<EditButtonProps> = ({CreateRecipe}) => {
    return (
        <div className="EditButton">
            <button className="bi bi-pencil" onClick={() => console.log(CreateRecipe)}>Edit</button>
        </div>
    );
};

export default EditButton;




