import React, { useEffect, useState } from "react";
import AddProductLine from "./AddProductLine";
import Button from "react-bootstrap/Button";
import { NeededProduct, Product } from "../types/Products";

interface AddProductsProps {
  initialValue: NeededProduct[];
  onChange: (products: NeededProduct[]) => void;
  availableProducts: Product[];
}

const AddProducts: React.FC<AddProductsProps> = ({
  initialValue,
  onChange,
  availableProducts,
}) => {
  const [neededProducts, setNeededProducts] = useState<NeededProduct[]>([]);
  const emptyNeededProduct: NeededProduct = {
    id: -1,
    productName: "",
    amount: 0,
  };

  useEffect(() => {
    setNeededProducts(initialValue);
  }, [initialValue]);

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
            products={availableProducts.map((prod: Product) => prod.name)}
            initialValue={product.productName}
            onChange={(prod: string, amount: number) => {
              updateNeededProduct(index, prod, amount);
            }}
            onRemove={() => {
              removeNeededProductAt(index);
            }}
            getUnitOf={(product: string) => {
              return (
                availableProducts.find((prod: Product) => prod.name === product)
                  ?.unit || ""
              );
            }}
          />
        );
      })}

      <Button
        onClick={() => {
          const neededProductsNew: NeededProduct[] = [
            ...neededProducts,
            { ...emptyNeededProduct, id: Date.now() },
          ];
          setNeededProducts(neededProductsNew);
          onChange(neededProductsNew);
        }}
        className="bi bi-plus"
        data-testid="add-product"
      ></Button>
    </div>
  );
};

export default AddProducts;
