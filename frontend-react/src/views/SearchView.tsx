import React, { useEffect, useState } from "react";
import AddProductLine from "../components/AddProductLine";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import Heading, { Heading2 } from "../components/Heading";
import ImageArea from "../components/ImageArea";
import { NeededProduct, Product } from "../types/Products";
import { ProductsService } from "../services/ProductService";
import { RecipeService } from "../services/RecipeService";

/**
 * Component for searching recipes based on needed products.
 *
 * This component allows users to add products, specify their quantities, and search for recipes
 * that include those products. The search results are displayed as a list of clickable items
 * that navigate to the recipe details.
 *
 * @returns {JSX.Element} The rendered component.
 */
function SearchView(): JSX.Element {
    const [neededProducts, setNeededProducts] = useState<NeededProduct[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [productsData, setProductsData] = useState<Product[]>([]);

    // Fetch products from the backend
    useEffect(() => {
        ProductsService.getAll().then((products) => {
            setProductsData(products);
        });
    }, []);

    /**
     * Handles changes to the product and amount in the needed products list.
     *
     * @param {number} index - The index of the product in the needed products list.
     * @param {string} product - The name of the product.
     * @param {number} amount - The amount of the product.
     */
    const handleProductChange = (index: number, product: string, amount: number) => {
        const updatedProducts = [...neededProducts];
        updatedProducts[index] = { id: index, productName: product, amount: amount };
        setNeededProducts(updatedProducts);
    };

    /**
     * Handles the removal of a product from the needed products list.
     *
     * @param {number} index - The index of the product to remove.
     */
    const handleRemoveProduct = (index: number) => {
        const filteredProducts = neededProducts.filter((_, i) => i !== index);
        setNeededProducts(filteredProducts);
    };

    // Fetch all the recipes that contain the specified products
    const handleSearch = () => {
        RecipeService.searchRecipesByProducts(neededProducts.map((product: NeededProduct) => {
            // Replace ids needed for rendering with the actual product ids from the backend before passing the data to the recipe service
            return {
                id: productsData.find((prod: Product) => prod.name === product.productName)?.id || 0,
                productName: product.productName,
                amount: product.amount,
            }
        })).then((results) => {
            setSearchResults(results);
        }).catch((_) => {
            setSearchResults([]);
        });
    };

    /**
     * Gets the unit of a specified product.
     *
     * @param {string} product - The name of the product.
     * @returns {string} The unit of the product.
     */
    const getUnitOfProduct = (product: string): string => {
        return productsData.find((prod: Product) => prod.name === product)?.unit || "";
    };

    /**
     * Adds an empty product line to the needed products list.
     */
    const addProduct = () => {
        const emptyNeededProduct: NeededProduct = {
            id: Date.now(),
            productName: productsData.length > 0 ? productsData[0].name : "",
            amount: 0,
        };

        setNeededProducts([...neededProducts, emptyNeededProduct]);
    };

    /**
     * Renders the product lines for the needed products.
     *
     * @returns {JSX.Element[]} The rendered product lines.
     */
    const renderProductLines = () => {
        return neededProducts.map((product, index) => (
            <AddProductLine
                key={index}
                products={productsData.map((prod: Product) => prod.name)}
                initialValue={product.productName}
                onChange={(prod: string, amount: number) => handleProductChange(index, prod, amount)}
                onRemove={() => handleRemoveProduct(index)}
                getUnitOf={getUnitOfProduct}
                getProduct={() => {
                    return product;
                }}/>
        ));
    };

    /**
     * Opens the recipe details view for a specified recipe ID.
     *
     * @param {number} id - The ID of the recipe.
     */
    const openRecipeDetails = (id: number) => {
        window.location.assign(`/recipe/view/${id}`);
    };

    return (
        <div className="search-view">
            <Heading headingText="Suche" />
            <Heading2 headingText="Produkte:" />

            {renderProductLines()}

            <Stack gap={2} className="col-md-4 mx-auto">
                <Button onClick={addProduct} className="bi bi-plus">
                    Produkt hinzufügen
                </Button>

                <Button variant="primary" onClick={handleSearch} className="mt-3 bi bi-search">
                    Suchen
                </Button>
            </Stack>

            <Heading2 headingText="Ergebnisse:" />
            <ListGroup>
                {searchResults.map((result, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center" onClick={() => openRecipeDetails(result.id)}>
                        <ImageArea origin={result.imgUri} />
                        <span className="ms-3">{result.title}</span>
                    </ListGroup.Item>
                ))}
                {searchResults.length === 0 && (
                    <ListGroup.Item className="d-flex align-items-center">
                        <span>Keine Rezepte gefunden</span>
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
}

export default SearchView;