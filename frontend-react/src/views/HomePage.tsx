import "../style/HomePage.css";
import React, { useEffect, useState } from "react";
import ImageArea from "../components/ImageArea";
import { RecipeService } from "../services/RecipeService";
import {Recipe} from "../types/Recipes";
import MyRecipeBar from "../components/MyRecipeBar";
import EditButton from "../components/EditButton";
import Stack from "react-bootstrap/Stack";
import {Link} from "react-router-dom";
import {ProductsService} from "../services/ProductService";
import {NeededProduct, Product} from "../types/Products";
import Heading, {Heading2} from "../components/Heading";
import Button from "react-bootstrap/Button";
import AddProductLine from "../components/AddProductLine";

function HomePage() {
  const [myRecipes, setMyRecipe] = useState<Recipe[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [neededProducts, setNeededProducts] = useState<NeededProduct[]>([]);

    // Fetch recipes
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

    // Fetch products from the backend
    useEffect(() => {
        ProductsService.getAll().then((products) => {
            setProductsData(products);
        });
    }, []);

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

    const handleProductChange = (index: number, product: string, amount: number) => {
        const updatedProducts = [...neededProducts];
        updatedProducts[index] = { id: index, productName: product, amount: amount };
        setNeededProducts(updatedProducts);
    };

    const handleRemoveProduct = (index: number) => {
        const filteredProducts = neededProducts.filter((_, i) => i !== index);
        setNeededProducts(filteredProducts);
    };

    const getUnitOfProduct = (product: string): string => {
        return productsData.find((prod: Product) => prod.name === product)?.unit || "";
    };

    const addProduct = () => {
        const emptyNeededProduct: NeededProduct = {
            id: Date.now(),
            productName: productsData.length > 0 ? productsData[0].name : "",
            amount: 0,
        };

        setNeededProducts([...neededProducts, emptyNeededProduct]);
    };

    // Save the products in the fridge
    const saveAllProducts = () => {
        const productsToSave = neededProducts.filter(product => product.amount > 0);
    };

        const renderProductLines = () => {
        return neededProducts.map((product, index) => (
            <div key={index} className="product-line">
                <AddProductLine
                    key={index}
                    products={productsData.map((prod: Product) => prod.name)}
                    initialValue={product.productName}
                    onChange={(prod: string, amount: number) => handleProductChange(index, prod, amount)}
                    onRemove={() => handleRemoveProduct(index)}
                    getUnitOf={getUnitOfProduct}
                />
            </div>
        ));
    };


    const realPage = myRecipes.map((recipe, index) => (
    <div key={index} className="RowArea ">
        <Stack direction={"horizontal"}>
            <ImageArea
                origin="https://www.gluthelden.de/wp-content/uploads/2018/06/K%C3%A4seso%C3%9Fe-.jpg"/>
            <Link to={`/recipe/view/${recipe.id}`}> <MyRecipeBar Recipe={recipe}/></Link>
            <EditButton Recipe={recipe}/>
        </Stack>
    </div>
    ));
    return (
    <div><h1>Meine Rezepte</h1>
        {realPage}

        <Heading2 headingText="Mein Kühlschrank"/>

        {renderProductLines()}

        <Stack gap={2} className="col-md-4 mx-auto">
            <Button onClick={addProduct} className="bi bi-plus">
                Produkt hinzufügen
            </Button>

            <Button onClick={saveAllProducts} className="save-button">
                Speichern
            </Button>
        </Stack>
    </div>
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

    );

}

export default HomePage;