import React, {useEffect, useState} from "react";
import Heading, {Heading2} from "../components/Heading";
import {TextArea2} from "../components/TextArea";
import Stack from "react-bootstrap/Stack";
import IngredientsTable from "../components/IngredientsTable";
import Footer from "../components/Footer";
import {Recipe} from "../types/Recipes";
import {useParams} from "react-router-dom";

function RecipeDetailView() {
  const backendURL: string =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const {id} = useParams<{id:string}>();

    useEffect( () =>  {
        (async ()=> {
            try {
                const response = await fetch(`${backendURL}/recipes/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to load recipe.");
                }
                const data: Recipe = await response.json();
                console.log(data);
                setRecipe(data);
            } catch (error) {
                console.error(error);
            }
        })();

    }, [id, backendURL]);

    if (!recipe) {
        return<div>
            <Stack direction={"vertical"}>
                <Heading headingText={"Rezept nicht gefunden"}/>
                <img src="https://www.gluthelden.de/wp-content/uploads/2018/06/K%C3%A4seso%C3%9Fe-.jpg" className="img-fluid" alt={"dish"}/>
                <Heading headingText={"Zutaten"}/>
                <IngredientsTable ingredients={[{name: "Käse", amount: 3, unit: "g"}, {name:"Teig", amount:100, unit:"g"}]}/>
                <TextArea2 initialValue={"Rezept nicht gefunden"} Header={"Zuberitung"}/>
                <Footer owner={"unknown"} timestamp={"unknown"}/>
            </Stack>
        </div>
    } else {
        return (
        <div>
            <Stack direction={"vertical"}>
                <Heading2 headingText={recipe.title}/>
                <img src={recipe.image} className="img-fluid" alt={"dish"}/>
                <Heading headingText={"Zutaten"}/>
                <IngredientsTable ingredients={recipe.products}/>
                <TextArea2 initialValue={recipe.description} Header={"Zuberitung"}/>
                <Footer owner={recipe.ownerUri} timestamp={recipe.creationDate.toString()}/>
            </Stack>

        </div>
    );
    }
}

export default RecipeDetailView;
