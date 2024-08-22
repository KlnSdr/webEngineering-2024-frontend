import React, { useEffect, useState } from "react";
import AddProductLine from "../components/AddProductLine";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import Heading, { Heading2 } from "../components/Heading";
import ImageArea from "../components/ImageArea";
import { NeededProduct, Product } from "../types/Products";
import {ProductsService} from "../services/ProductService";
import {RecipeService} from "../services/RecipeService";

function SearchView() {
  const [neededProducts, setNeededProducts] = useState<NeededProduct[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);

    //Fetch products from the backend
    useEffect(() => {
        ProductsService.getAll().then((products) => {
                setProductsData(products);
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

    //Fetch all the recipes that contain the specified products
    const handleSearch = () => {
        RecipeService.searchRecipesByProducts(neededProducts).then((results) => {
            setSearchResults(results);
        });
    };

    return (
        <div className="search-view">
            <Heading headingText="Suche" />
            <Heading2 headingText="Produkte:" />

            {neededProducts.map((product, index) => (
                <AddProductLine
                    key={index}
                    products={productsData.map((prod: Product) => prod.name)}
                    initialValue={product.productName}
                    onChange={(prod: string, amount: number) => handleProductChange(index, prod, amount)}
                    onRemove={() => handleRemoveProduct(index)}
                    getUnitOf={(product: string) => {
                        return productsData.find((prod: Product) => prod.name === product)?.unit || "";
                    }}
                />
            ))}

            <Stack gap={2} className="col-md-4 mx-auto">
                <Button
                    onClick={() => setNeededProducts([...neededProducts, { id: Date.now(), productName: "", amount: 0 }])}
                    className="bi bi-plus"
                >
                    Produkt hinzufügen
                </Button>

                <Button  variant="primary" onClick={handleSearch} className="mt-3 bi bi-search">
                    Suchen
                </Button>
            </Stack>

            <Heading2 headingText="Ergebnisse:" />
            <ListGroup>
                {searchResults.map((result, index) => (
                    <ListGroup.Item key={index} className="d-flex align-items-center">
                        <ImageArea origin={result.image} />
                        <span className="ms-3">{result.title}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );

}

export default SearchView;
