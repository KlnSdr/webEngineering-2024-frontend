import React, {useEffect, useState} from "react";
import Heading, {Heading2} from "../components/Heading";
import {TextArea2} from "../components/TextArea";
import Stack from "react-bootstrap/Stack";
import IngredientsTable from "../components/IngredientsTable";
import Footer from "../components/Footer";
import {Recipe} from "../types/Recipes";
import {useParams} from "react-router-dom";
import {ProductsService} from "../services/ProductService";
import {Product} from "../types/Products";
import {User} from "../types/Users";
import {UserService} from "../services/UserService";

function RecipeDetailView() {
  const backendURL: string =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [owner, setOwner] = useState<User | null>(null);
    const {id} = useParams<{id:string}>();

    useEffect( () =>  {
        ProductsService.getAll().then((productDetails: Product[]) => {
        (async () => {
            try {
                const response = await fetch(`${backendURL}/recipes/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to load recipe.");
                }
                const data: any = await response.json();
                const recipe: Recipe = {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    imgUri: data.imgUri,
                    isPrivate: data.isPrivate,
                    creationDate: new Date(data.creationDate),
                    ownerUri: data.ownerUri,
                    likedByUserUris: data.likedByUserUris,
                    products: Object.keys(data.productQuantities).map((key: string) => {
                        const productId: number = parseInt(key.replace("/products/", ""));
                        const productDetail: Product | undefined = productDetails.find((val: Product) => val.id === productId);
                        return {
                            id: productId,
                            name: productDetail?.name || "---",
                            amount: data.productQuantities[key],
                            unit: productDetail?.unit || "---"
                        }
                    })
                };

                UserService.getUser(data.ownerUri)
                .then(setOwner)
                .catch(_ => {
                    setOwner({
                        userName: "could not load username",
                        userId: -1
                    });
                });
                setRecipe(recipe);
            } catch (error) {
                console.error(error);
            }
        })();});

    }, [id, backendURL]);

    if (!recipe) {
        return<div>
            <Stack direction={"vertical"}>
                <Heading headingText={"Rezept nicht gefunden"}/>
                <img src="https://www.gluthelden.de/wp-content/uploads/2018/06/K%C3%A4seso%C3%9Fe-.jpg" className="img-fluid" alt={"dish"}/>
                <Heading headingText={"Zutaten"}/>
                <IngredientsTable ingredients={[{name: "Käse", amount: 3, unit: "g"}, {name:"Teig", amount:100, unit:"g"}]}/>
                <TextArea2 initialValue={"Rezept nicht gefunden"} Header={"Zubereitung"}/>
                <Footer owner={"unknown"} timestamp={"unknown"}/>
            </Stack>
        </div>
    } else {
        return (
        <div>
            <Stack direction={"vertical"}>
                <Heading2 headingText={recipe.title}/>
                <img src={recipe.imgUri} className="img-fluid" alt={"dish"}/>
                <Heading headingText={"Zutaten"}/>
                <IngredientsTable ingredients={recipe.products}/>
                <TextArea2 initialValue={recipe.description} Header={"Zubereitung"}/>
                <Footer owner={owner?.userName || ""} timestamp={recipe.creationDate.toString()}/>
            </Stack>

        </div>
    );
    }
}

export default RecipeDetailView;
