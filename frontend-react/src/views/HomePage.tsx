import "../style/HomePage.css";
import { useEffect, useState } from "react";
import ImageArea from "../components/ImageArea";
import { RecipeService } from "../services/RecipeService";
import {CreateRecipe} from "../types/Recipes";

function HomePage() {
  const [myRecipes, setMyRecipe] = useState<CreateRecipe[]>([]);

    useEffect(() => {
    RecipeService.getAll().then((recipes) => {
        setMyRecipe(recipes);
      console.log(recipes);
    });
    }, []);

    let realPage = [];
for (let i = 0; i < myRecipes.length; i++) {
    realPage[i] = <div className="RowArea">
      <ImageArea origin="https://www.gluthelden.de/wp-content/uploads/2018/06/K%C3%A4seso%C3%9Fe-.jpg"/>
      <div className="TextArea">
        <h2 className="FoodTitle">{myRecipes[i].title}</h2>
      </div>
      <div className="EditButton">
        <button className="bi bi-pencil" onClick={() => console.log(myRecipes[i])}>Edit</button>
      </div>
    </div>
}
    return (
       <div> <h1>Meine Rezepte</h1>
        {realPage}
       </div>
    );


}

export default HomePage;