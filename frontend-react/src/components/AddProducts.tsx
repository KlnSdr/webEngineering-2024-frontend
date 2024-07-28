import React, { useState } from "react";
import AddProductLine from "./AddProductLine";
import Button from "./Button";
import { NeededProduct } from "../types/Products";

interface AddProductsProps {
    onChange: (products: NeededProduct[]) => void;
}

const AddProducts: React.FC<AddProductsProps> = ({onChange}) => {
  const [neededProducts, setNeededProducts] = useState<NeededProduct[]>([]);
  const emptyNeededProduct: NeededProduct = {id: -1, productName: "", amount: 0 };
  const availableProducts: {[product: string]: string} = {"": "", "one": "g", "two": "ml", "three": "stk"};

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
    setNeededProducts(neededProductsCopy);
    onChange(neededProductsCopy);
  };

  const removeNeededProductAt = (index: number) => {
    const filtered = neededProducts.filter((_, i: number) => i !== index);
    setNeededProducts(filtered);
    onChange(filtered);
  };

  return (
    <div>
      {neededProducts.map((product: NeededProduct, index: number) => {
        return (
          <AddProductLine
            key={product.id}
            products={Object.keys(availableProducts)}
            initialValue={product.productName}
            onChange={(prod: string, amount: number) => {
              updateNeededProduct(index, prod, amount);
            }}
            onRemove={() => {
              removeNeededProductAt(index);
            }}
          getUnitOf={(product: string) => availableProducts[product]}
          />
        );
      })}

      <Button
        text="+"
        onClick={() => {
            const neededProductsNew: NeededProduct[] = [...neededProducts, {...emptyNeededProduct, id: Date.now()}];
            setNeededProducts(neededProductsNew);
            onChange(neededProductsNew);
        }}
      />
    </div>
  );
};

export default AddProducts;
