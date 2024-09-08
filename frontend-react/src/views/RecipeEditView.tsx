import React, { useEffect, useState } from 'react';
import {Recipe} from "../types/Recipes";
import {useParams} from "react-router-dom";
import CreateRecipeView from "./CreateRecipeView";
import {Product} from "../types/Products";
import {ProductsService} from "../services/ProductService";
import {authorizedRequest} from "../services/Requests";

function EditRecipeView() {
    const {id} = useParams<{id:string}>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const backendURL: string = process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    useEffect(() => {
        ProductsService.getAll().then((productDetails: Product[]) => {
            (async () => {
                try {
                    const response = await authorizedRequest(`${backendURL}/recipes/${id}`);
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
                            };
                        })
                    };
                    setRecipe(recipe);
                } catch (error) {
                    console.error(error);
                }
            })();
        });
    }, [id, backendURL]);


    if (recipe === null) {
        return <div>Rezept mit Id {id} konnte nicht gefunden werden.</div>
    } else {
        return (<div>
            <CreateRecipeView recipe={recipe} />
        </div>);
    }


}

export default EditRecipeView;