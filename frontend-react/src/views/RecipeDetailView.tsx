import React, {useEffect, useState} from "react";
import Heading, {Heading2} from "../components/Heading";
import {TextArea2} from "../components/TextArea";
import Stack from "react-bootstrap/Stack";
import IngredientsTable from "../components/IngredientsTable";
import Footer from "../components/Footer";
import {Recipe} from "../types/Recipes";
import {useParams} from "react-router-dom";

function RecipeDetailView() {

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const {id} = useParams<{id:string}>();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:13000/recipes/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to load recipe.");
                }
                const data: Recipe = await response.json();
                console.log(data);
                setRecipe(data);
            } catch (error) {
                console.error(error);
            }
        };
    }, [id]);

    if (!recipe) {
        return( <div>Recipe not found</div>);
    }else{
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