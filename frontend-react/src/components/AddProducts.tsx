import React, { useEffect, useState } from "react";
import AddProductLine from "./AddProductLine";
import Button from "react-bootstrap/Button";
import { NeededProduct, Product } from "../types/Products";

/**
 * Props for the AddProducts component.
 * @typedef {Object} AddProductsProps
 * @property {NeededProduct[]} initialValue - Initial list of needed products.
 * @property {function} onChange - Callback function to handle changes in the needed products list.
 * @property {Product[]} availableProducts - List of available products.
 */
interface AddProductsProps {
  initialValue: NeededProduct[];
  onChange: (products: NeededProduct[]) => void;
  availableProducts: Product[];
}

/**
 * AddProducts component allows users to manage a list of needed products.
 * @param {AddProductsProps} props - The props for the component.
 * @returns {JSX.Element} The rendered AddProducts component.
 */
const AddProducts: React.FC<AddProductsProps> = ({
  initialValue,
  onChange,
  availableProducts,
}) => {
  const [neededProducts, setNeededProducts] = useState<NeededProduct[]>([]);
  const emptyNeededProduct: NeededProduct = {
    id: -1,
    productName: availableProducts.length > 0 ? availableProducts[0].name : "",
    amount: 0,
  };

  useEffect(() => {
    setNeededProducts(initialValue);
  }, [initialValue]);

  /**
   * Updates a needed product at a specific index.
   * @param {number} index - The index of the product to update.
   * @param {string} productName - The new product name.
   * @param {number} amount - The new amount.
   */
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

  /**
   * Removes a needed product at a specific index.
   * @param {number} index - The index of the product to remove.
   */
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
            getProduct={() => {
                return product;
            }}
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