import "../style/HomePage.css";
import React, { useEffect, useState } from "react";
import ImageArea from "../components/ImageArea";
import { RecipeService } from "../services/RecipeService";
import { Recipe } from "../types/Recipes";
import MyRecipeBar from "../components/MyRecipeBar";
import EditButton from "../components/EditButton";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import { ProductsService } from "../services/ProductService";
import { NeededProduct, Product } from "../types/Products";
import { Heading2 } from "../components/Heading";
import Button from "react-bootstrap/Button";
import { FridgeService } from "../services/FridgeService";
import { UserService } from "../services/UserService";
import { Table } from "react-bootstrap";
import Dropdown from "../components/Dropdown";

/**
 * HomePage view that displays recipes and manages fridge content.
 * @returns {JSX.Element} The rendered component.
 */
function HomePage(): JSX.Element {
    const [myRecipes, setMyRecipe] = useState<Recipe[]>([]);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [fridgeProducts, setFridgeProducts] = useState<NeededProduct[]>([]);
    const [tempProducts, setTempProducts] = useState<NeededProduct[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    /**
     * Fetches all products from the backend when the component mounts.
     * @returns {void}
     */
    useEffect(() => {
        ProductsService.getAll().then((products) => {
            setProductsData(products);
        });
    }, []);

    /**
     * Fetches user info and fridge content when the component mounts.
     * @returns {void}
     */
    useEffect(() => {
        UserService.getUserInfo()
            .then((userInfo) => {
                if (userInfo && userInfo.id) {
                    const userId = userInfo.id; // Extract userId from internalUser
                    setUserId(userId);
                    myRecipeSet(userId);
                    return FridgeService.getFridgeContent(userId); // Fetch fridge content using userId
                }
                throw new Error("User not found");
            })
            .then((products) => {
                // Transform fetched products to match NeededProduct format
                const updatedFridgeProducts = products.map((product: any) => ({
                    id: product.id,
                    productName: product.name,
                    amount: product.quantity,
                }));
                // Initialize with existing fridge content
                setFridgeProducts(updatedFridgeProducts);
            })
            .catch((error) => {
                console.error("Failed to load fridge content:", error);
            });
    }, []);

    /**
     * Fetches recipes created by the user.
     * @param {number} usrId - The user ID.
     * @returns {void}
     */
    function myRecipeSet(usrId: number): void {
        RecipeService.getRecipeByUser(usrId).then((recipes) => {
            if (recipes) {
                setMyRecipe(recipes);
            }
        });
    }

    /**
     * Handles changes to the product in the temporary product list.
     * @param {number} index - The index of the product in the temporary list.
     * @param {string} productName - The name of the product.
     * @param {number} amount - The amount of the product.
     * @returns {void}
     */
    const handleProductChange = (index: number, productName: string, amount: number): void => {
        const productId = productsData.find(p => p.name === productName)?.id;
        const updatedProducts = [...tempProducts];
        if (productId !== undefined) {
            updatedProducts[index] = { ...updatedProducts[index], id: productId, productName, amount };
            setTempProducts(updatedProducts);
        }
    };

    /**
     * Handles removal of a product from the temporary product list.
     * @param {number} index - The index of the product to remove.
     * @returns {void}
     */
    const handleRemoveProduct = (index: number): void => {
        const updatedProducts = tempProducts.filter((_, i) => i !== index);
        setTempProducts(updatedProducts);

        // If no more temp products, hide the table
        if (updatedProducts.length === 0) {
            setIsAddingProduct(false);
        }
    };

    /**
     * Adds a new product to the temporary product list.
     * @returns {void}
     */
    const addProduct = (): void => {
        setIsAddingProduct(true); // Show table when adding a product
        const defaultProduct = productsData.length > 0 ? productsData[0] : null;
        if (defaultProduct) {
            setTempProducts([
                ...tempProducts,
                { id: Date.now(), productName: defaultProduct.name, amount: 0 }
            ]);
        }
    };

    /**
     * Saves all products in the temporary list to the fridge.
     * @returns {void}
     */
    const saveAllProducts = (): void => {
        if (userId === null) return;

        // Filter out products with an amount of 0
        let filteredProducts = tempProducts.filter(product => product.amount > 0);
        filteredProducts = filteredProducts.map((product: NeededProduct) => {
            return {
              ...product,
              id:
                productsData.find(
                  (p: Product) => p.name === product.productName
                )?.id || 0,
            };
        });

        FridgeService.updateFridgeContent(userId, filteredProducts)
            .then(() => FridgeService.getFridgeContent(userId))
            .then((fetchedProducts) => {
                const updatedFridgeProducts = fetchedProducts.map((product: any) => ({
                    id: product.id,
                    productName: product.name,
                    amount: product.quantity,
                }));
                setFridgeProducts(updatedFridgeProducts);
                setIsAddingProduct(false);
                setTempProducts([]);
            })
            .catch((error) => {
                console.error("Failed to update fridge content:", error);
            });
    };

    /**
     * Deletes a product from the fridge.
     * @param {number} productId - The ID of the product to delete.
     * @returns {void}
     */
    const deleteProduct = (productId: number): void => {
        if (userId === null) return;

        FridgeService.deleteFridgeProduct(userId, productId)
            .then(() => FridgeService.getFridgeContent(userId))
            .then((updatedProducts) => {
                const updatedFridgeProducts = updatedProducts.map((product: any) => ({
                    id: product.id,
                    productName: product.name,
                    amount: product.quantity,
                }));
                setFridgeProducts(updatedFridgeProducts);
            })
            .catch((error) => {
                console.error("Failed to delete product from fridge:", error);
            });
    };

    /**
     * Renders the content of the fridge as table rows.
     * @returns {JSX.Element[]} Array of JSX elements representing the table rows.
     */
    const renderFridgeContent = (): JSX.Element[] => {
        return fridgeProducts.map((product, index) => (
            <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.amount} {productsData?.find((p) => p.name === product.productName)?.unit || ""}</td>
                <td>
                    <Button variant="danger" onClick={() => deleteProduct(product.id)}>
                        Löschen
                    </Button>
                </td>
            </tr>
        ));
    };

    /**
     * Renders temporary product lines as table rows.
     * @returns {JSX.Element[]} Array of JSX elements representing the table rows.
     */
    const renderProductLines = (): JSX.Element[] =>
        tempProducts.map((product, index) => (
            <tr key={product.id}>
                <td>
                    <Dropdown options={productsData.map((val: Product) => val.name)} initialValue={product.productName} onChange={
                        (value: string) => handleProductChange(index, value, product.amount)
                    } />
                </td>
                <td>
                    <input
                        type="number"
                        value={product.amount}
                        onChange={(e) => handleProductChange(index, product.productName, parseInt(e.target.value))}
                    />{" "}
                    {productsData.find((p) => p.name === product.productName)?.unit || ""}
                </td>
                <td>
                    <Button variant="outline-danger" onClick={() => handleRemoveProduct(index)}>
                        X
                    </Button>
                </td>
            </tr>
        ));

    /**
     * Deletes a recipe.
     * @param {number} id - The ID of the recipe to delete.
     * @returns {void}
     */
    const deleteRecipe = (id: number): void => {
        RecipeService.deleteRecipe(id)
            .then(() => {
                RecipeService.getRecipeByUser(userId!).then((recipes) => {
                    setMyRecipe(recipes);
                });
            })
            .catch((error) => {
                console.error("Failed to delete recipe:", error);
            });
    };

    const realPage = myRecipes.map((recipe: Recipe) => (
        <div className="RowArea ">
            <Stack direction={"horizontal"} className={"mt-3"}>
                <ImageArea origin={recipe.imgUri} />
                <Link to={`/recipe/view/${recipe.id}`}> <MyRecipeBar Recipe={recipe} /></Link>
                <div className="col-1">
                    <EditButton Link={`/recipe/edit/${recipe.id}`} />
                    <Button variant="danger" className={"bi bi-x m-2"}
                        onClick={() => deleteRecipe(recipe.id)}></Button>
                </div>
            </Stack>
        </div>
    ));

    return (
        <div>
            <h1>Meine Rezepte</h1>
            <div className="myRecipesDiv">
                {realPage.length === 0 ? <h3>Keine Rezepte vorhanden</h3> : realPage}
            </div>

            <Heading2 headingText="Mein Kühlschrank" />

            <Stack gap={2} className="col-md-4 mx-auto mt-3">
                <Button onClick={addProduct} variant="success">
                    Produkt hinzufügen
                </Button>

                <Button onClick={saveAllProducts} variant="primary">
                    Speichern
                </Button>
            </Stack>

            {isAddingProduct && (
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Produkt</th>
                            <th>Menge</th>
                            <th>Zeile entfernen</th>
                        </tr>
                    </thead>
                    <tbody>{renderProductLines()}</tbody>
                </Table>
            )}

            <Heading2 headingText="Kühlschrank Inhalt:" />
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>Menge</th>
                        <th>Löschen</th>
                    </tr>
                </thead>
                <tbody>
                    {renderFridgeContent()}
                </tbody>
            </Table>
        </div>
    );
}

export default HomePage;