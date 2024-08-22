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

}

export default SearchView;
