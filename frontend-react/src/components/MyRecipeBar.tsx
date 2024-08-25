import React from "react";
import {Recipe} from "../types/Recipes";
import {Heading2} from "./Heading";

interface MyRecipeBarProps {
    Recipe: Recipe;

}

const MyRecipeBar: React.FC<MyRecipeBarProps> = ({Recipe}) => {
    return (
            <div className="TextArea">
                <Heading2 headingText={Recipe.title}/>
            </div>
    );
};

export default MyRecipeBar;

