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
    RecipeService.getAll().then((recipes) => {
        if (recipes) {
            setMyRecipe(recipes);
        }
        console.log(recipes);
    }).catch((error) => {
        console.error("Failed",error);
    });
    }, []);

    const realPage = myRecipes.map((recipe, index) => (
        <div key={index} className="RowArea ">
            <Stack direction={"horizontal"}>
             <ImageArea origin="https://www.gluthelden.de/wp-content/uploads/2018/06/K%C3%A4seso%C3%9Fe-.jpg" />
             <Link to={`/recipe/view/${recipe.id}`}> <MyRecipeBar Recipe={recipe} /></Link>
             <EditButton Recipe={recipe} />
            </Stack>
        </div>
    ));
    return (
        <div><h1>Meine Rezepte</h1>
            {realPage}
        </div>
    );


}

export default HomePage;