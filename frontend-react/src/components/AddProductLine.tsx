import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {NeededProduct} from "../types/Products";

/**
 * Props for the AddProductLine component.
 * @typedef {Object} AddProductLineProps
 * @property {string[]} products - List of product names.
 * @property {string} initialValue - Initial value for the product dropdown.
 * @property {function} onChange - Callback function to handle changes in product or amount.
 * @property {function} onRemove - Callback function to handle removal of the product line.
 * @property {function} getUnitOf - Function to get the unit of a given product.
 * @property {function} getProduct - Function to get the needed product details.
 */
interface AddProductLineProps {
  products: string[];
  initialValue: string;
  onChange: (product: string, amount: number) => void;
  onRemove: () => void;
  getUnitOf: (product: string) => string;
  getProduct: () => NeededProduct
}

/**
 * AddProductLine component allows users to select a product, specify an amount, and remove the product line.
 * @param {AddProductLineProps} props - The props for the component.
 * @returns {JSX.Element} The rendered AddProductLine component.
 */
const AddProductLine: React.FC<AddProductLineProps> = ({
  products, initialValue, getProduct, onChange, onRemove, getUnitOf,
}) => {
  const [unit, setUnit] = useState(getUnitOf(initialValue));
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState(initialValue);

  useEffect(() => {
    const neededProduct = getProduct();
    setAmount(neededProduct.amount);
  }, [getProduct]);

  return (
    <Stack direction="horizontal">
      <Dropdown
        options={products}
        initialValue={product}
        onChange={(val: string) => {
          setProduct(val);
          setUnit(getUnitOf(val));
          onChange(val, amount);
        }}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(parseInt(e.target.value));
          onChange(product, parseInt(e.target.value));
        }}
        className="form-control"
      />
      <label>{unit || getUnitOf(product)}</label>
      <Button
        onClick={() => {
          onRemove();
        }}
        className="bi bi-x"
      ></Button>
    </Stack>
  );
};

export default AddProductLine;