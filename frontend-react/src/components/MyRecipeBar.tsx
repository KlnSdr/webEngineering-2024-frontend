import React from "react";
import {CreateRecipe} from "../types/Recipes";
import {Heading2} from "./Heading";

interface MyRecipeBarProps {
    CreateRecipe: CreateRecipe;

}

const MyRecipeBar: React.FC<MyRecipeBarProps> = ({CreateRecipe}) => {
    return (
            <div className="TextArea">
                <Heading2 headingText={CreateRecipe.title}/>
            </div>
    );
};

export default MyRecipeBar;

