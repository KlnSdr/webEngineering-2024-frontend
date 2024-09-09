import React from "react";
import {Recipe} from "../types/Recipes";
import {Heading2} from "./Heading";

/**
 * Props for the MyRecipeBar component.
 * @typedef {Object} MyRecipeBarProps
 * @property {Recipe} Recipe - The recipe object containing details to display.
 */
interface MyRecipeBarProps {
    Recipe: Recipe;
}

/**
 * MyRecipeBar component renders a heading for the given recipe.
 * @param {MyRecipeBarProps} props - The props for the component.
 * @returns {JSX.Element} The rendered MyRecipeBar component.
 */
const MyRecipeBar: React.FC<MyRecipeBarProps> = ({Recipe}) => {
    return (
            <div className="TextArea">
                <Heading2 headingText={Recipe.title}/>
            </div>
    );
};

export default MyRecipeBar;