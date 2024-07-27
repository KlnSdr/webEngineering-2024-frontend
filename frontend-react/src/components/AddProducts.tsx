import React, { useState } from "react";
import AddProductLine from "./AddProductLine";
import Button from "./Button";
import { NeededProduct } from "../types/Products";

interface AddProductsProps {}

const AddProducts: React.FC<AddProductsProps> = () => {
  const [neededProducts, setNeededProducts] = useState<NeededProduct[]>([
    {
        id: 1,
      productName: "",
      amount: 42,
    },
  ]);
  const emptyNeededProduct: NeededProduct = {id: -1, productName: "", amount: 0 };
  const availableProducts: string[] = ["", "one", "two", "three"];

  const updateNeededProduct = (
    index: number,
    productName: string,
    amount: number
  ) => {
    const neededProductsCopy: NeededProduct[] = [...neededProducts];
    neededProductsCopy[index] = {
        ...neededProductsCopy[index],
      productName: productName,
      amount: amount,
    };
    console.log(neededProductsCopy);
    setNeededProducts(neededProductsCopy);
  };

  const removeNeededProductAt = (index: number) => {
    const filtered = neededProducts.filter((_, i: number) => i != index);
    console.log(filtered);
    setNeededProducts(filtered);
  };

  return (
    <div>
      {neededProducts.map((product: NeededProduct, index: number) => {
        return (
          <AddProductLine
            key={product.id}
            products={availableProducts}
            initialValue={product.productName}
            onChange={(prod: string, amount: number) => {
              updateNeededProduct(index, prod, amount);
            }}
            onRemove={() => {
              console.log(index);
              removeNeededProductAt(index);
            }}
          />
        );
      })}

      <Button
        text="+"
        onClick={() => {
            setNeededProducts([...neededProducts, {...emptyNeededProduct, id: Date.now()}]);
        }}
      />
    </div>
  );
};

export default AddProducts;
