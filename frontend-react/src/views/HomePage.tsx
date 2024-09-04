import "../style/HomePage.css";
import React, { useEffect, useState } from "react";
import ImageArea from "../components/ImageArea";
import { RecipeService } from "../services/RecipeService";
import {Recipe} from "../types/Recipes";
import MyRecipeBar from "../components/MyRecipeBar";
import EditButton from "../components/EditButton";
import Stack from "react-bootstrap/Stack";
import {Link} from "react-router-dom";

function HomePage() {
  const [myRecipes, setMyRecipe] = useState<Recipe[]>([]);

    useEffect(() => {
    RecipeService.getRecipeById("1").then((recipes) => {
        if (recipes) {
            console.log("Recipes", recipes);
            setMyRecipe(Array(recipes));
        }
    }).catch((error) => {
        console.error("Failed",error);
    });
    }, []);

    if (myRecipes.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div><h1>Meine Rezepte</h1>
            <div className="RowArea ">
                <Stack direction={"horizontal"}>
                    <ImageArea origin={""}/>
                    <Link to={`/recipe/view/${myRecipes[0].id}`}> <MyRecipeBar Recipe={myRecipes[0]}/></Link>
                    <EditButton Recipe={myRecipes[0]}/>
                </Stack>
            </div>
        </div>
    );


}

export default HomePage;