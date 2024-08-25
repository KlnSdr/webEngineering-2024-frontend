import React from "react";
import {Recipe} from "../types/Recipes";
import Button from "react-bootstrap/Button";

interface EditButtonProps {
    Recipe: Recipe;
}

const EditButton: React.FC<EditButtonProps> = ({Recipe}) => {
    return (
        <div className="EditButton">
            <Button className="bi bi-pencil" onClick={() => console.log(Recipe)}>Edit</Button>
        </div>
    );
};

export default EditButton;




