import "../style/HomePage.css";
import React, { useEffect, useState } from "react";
import ImageArea from "../components/ImageArea";
import { RecipeService } from "../services/RecipeService";
import {CreateRecipe} from "../types/Recipes";
import MyRecipeBar from "../components/MyRecipeBar";
import EditButton from "../components/EditButton";

function HomePage() {
  const [myRecipes, setMyRecipe] = useState<CreateRecipe[]>([]);

    useEffect(() => {
    RecipeService.getAll().then((recipes) => {
        setMyRecipe(recipes);
      console.log(recipes);
    });
    }, []);

    const realPage = myRecipes.map((recipe, index) => (
        <div key={index} className="RowArea">
            <ImageArea origin="https://www.gluthelden.de/wp-content/uploads/2018/06/K%C3%A4seso%C3%9Fe-.jpg" />
            <MyRecipeBar CreateRecipe={recipe} />
            <EditButton CreateRecipe={recipe} />
        </div>
    ));
    return (
        <div><h1>Meine Rezepte</h1>
            {realPage}
        </div>
    );


}

export default HomePage;