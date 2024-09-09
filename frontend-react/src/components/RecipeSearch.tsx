import React from "react";
import LabelInput from "./LabelInput";
import { RecipeService } from "../services/RecipeService";
import { Recipe } from "../types/Recipes";
import Stack from "react-bootstrap/Stack";
import ImageArea from "./ImageArea";
import { Link } from "react-router-dom";
import MyRecipeBar from "./MyRecipeBar";
import Button from "react-bootstrap/Button";

/**
 * Props for the RecipeSearch component.
 * @typedef {Object} RecipeSearchProps
 * @property {function} onAdd - Callback function to handle adding a recipe.
 */
interface RecipeSearchProps {
    onAdd: (recipe: Recipe) => void;
}

/**
 * RecipeSearch component allows users to search for recipes and add them.
 * @param {RecipeSearchProps} props - The props for the component.
 * @returns {JSX.Element} The rendered RecipeSearch component.
 */
const RecipeSearch: React.FC<RecipeSearchProps> = ({ onAdd }) => {
    const [searchResults, setSearchResults] = React.useState<Recipe[]>([]);

    /**
     * Performs a search for recipes based on the provided search string.
     * @param {string} searchString - The search string to use for finding recipes.
     */
    const doSearch = (searchString: string) => {
        if (searchString.length < 3) {
            setSearchResults([]);
            return;
        }
        RecipeService.searchRecipesByText(searchString).then((recipes) => {
            setSearchResults(recipes);
        }).catch((reason: any) => {
            console.error(reason);
            setSearchResults([]);
        });
    };

    return (
        <div>
            <LabelInput labelText={"Rezepte suchen"} initialValue={""} onChange={doSearch} />
            {searchResults.map((recipe) => {
                return (
                    <Stack direction={"horizontal"} key={recipe.id}>
                        <ImageArea origin={recipe.imgUri} />
                        <Link to={`/recipe/view/${recipe.id}`}>
                            <MyRecipeBar Recipe={recipe} />
                        </Link>
                        <Button variant="primary" className={"bi bi-plus"} onClick={() => {
                            onAdd(recipe);
                            setSearchResults([]);
                        }}></Button>
                    </Stack>
                );
            })}
        </div>
    );
}

export default RecipeSearch;