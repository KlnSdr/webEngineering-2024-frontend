import React from "react";
import {CreateRecipe} from "../types/Recipes";

interface MyRecipeBarProps {
    CreateRecipe: CreateRecipe;

}

const MyRecipeBar: React.FC<MyRecipeBarProps> = ({CreateRecipe}) => {
    return (
            <div className="TextArea">
                <h2 className="FoodTitle">{CreateRecipe.title}</h2>
            </div>
    );
};

export default MyRecipeBar;

