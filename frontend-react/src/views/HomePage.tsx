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
import {Heading2} from "../components/Heading";
import Button from "react-bootstrap/Button";
import {FridgeService} from "../services/FridgeService";
import {UserService} from "../services/UserService";
import {Table} from "react-bootstrap";


function HomePage() {
    const [myRecipes, setMyRecipe] = useState<Recipe[]>([]);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [fridgeProducts, setFridgeProducts] = useState<NeededProduct[]>([]);
    const [tempProducts, setTempProducts] = useState<NeededProduct[]>([]);
    const [userId, setUserId] = useState<number | null>(null);


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

    // Fetch user and fridge content
    useEffect(() => {
        UserService.getUserInfo()
            .then((userInfo) => {
                if (userInfo && userInfo.id) {
                    setUserId(userInfo.id);
                    return FridgeService.getFridgeContent(userInfo.id);
                }
                throw new Error("User not found");
            })
            .then((products) => {
                setFridgeProducts(products); // Initialize with existing fridge content
            })
            .catch((error) => {
                console.error("Failed to load fridge content:", error);
            })
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
        const updatedProducts = [...tempProducts];
        updatedProducts[index] = { ...updatedProducts[index], productName: product, amount: amount };
        setTempProducts(updatedProducts);
    };

    const handleRemoveProduct = (index: number) => {
        const updatedProducts = tempProducts.filter((_, i) => i !== index);
        setTempProducts(updatedProducts);
    };

    const addProduct = () => {
        const defaultProduct = productsData.length > 0 ? productsData[0].name : "";
        setTempProducts([...tempProducts, { id: Date.now(), productName: defaultProduct, amount: 0 }]);
    };

    const saveAllProducts = () => {
        if (userId === null) return;

        FridgeService.updateFridgeContent(userId, tempProducts)
            .then(() => {
                setFridgeProducts(tempProducts);
                alert("Fridge updated successfully!");
            })
            .catch((error) => {
                console.error("Failed to update fridge content:", error);
                alert("Failed to update fridge. Please try again.");
            });
    };

    const deleteProduct = (productId: number) => {
        if (userId === null) return;

        FridgeService.deleteFridgeProduct(userId, productId)
            .then(() => {
                setFridgeProducts(fridgeProducts.filter(product => product.id !== productId));
                alert("Product removed successfully!");
            })
            .catch((error) => {
                console.error("Failed to delete product from fridge:", error);
                alert("Failed to remove product. Please try again.");
            });
    };

    const renderFridgeContent = () =>
        fridgeProducts.map((product, index) => (
            <li key={index}>
                {product.productName}: {product.amount}{" "}
                {productsData.find((p) => p.name === product.productName)?.unit || ""}
            </li>
        ));

    const renderProductLines = () =>
        tempProducts.map((product, index) => (
            <tr key={product.id}>
                <td>
                    <select
                        value={product.productName}
                        onChange={(e) => handleProductChange(index, e.target.value, product.amount)}
                    >
                        {productsData.map((prod) => (
                            <option key={prod.id} value={prod.name}>
                                {prod.name}
                            </option>
                        ))}
                    </select>
                </td>
                <td>
                    <input
                        type="number"
                        value={product.amount}
                        onChange={(e) => handleProductChange(index, product.productName, parseFloat(e.target.value))}
                    />{" "}
                    {productsData.find((p) => p.name === product.productName)?.unit || ""}
                </td>
                <td>
                    <Button variant="danger" onClick={() => deleteProduct(product.id)}>
                        Löschen
                    </Button>
                </td>
                <td>
                    <Button variant="outline-danger" onClick={() => handleRemoveProduct(index)}>
                        X
                    </Button>
                </td>
            </tr>
        ));


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

        <Heading2 headingText="Mein Kühlschrank" />

        <Stack gap={2} className="col-md-4 mx-auto mt-3">
            <Button onClick={addProduct} variant="success">
                Produkt hinzufügen
            </Button>

            <Button onClick={saveAllProducts} variant="primary">
                Speichern
            </Button>
        </Stack>

        <Table striped bordered hover className="mt-3">
            <thead>
            <tr>
                <th>Produkt</th>
                <th>Menge</th>
                <th>Löschen</th>
                <th>Zeile entfernen</th>
            </tr>
            </thead>
            <tbody>{renderProductLines()}</tbody>
        </Table>

        <Heading2 headingText="Kühlschrank Inhalt:" />
        <ul>
            {renderFridgeContent()}
        </ul>
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