import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

interface AddProductLineProps {
  products: string[];
  initialValue: string;
  onChange: (product: string, amount: number) => void;
  onRemove: () => void;
  getUnitOf: (product: string) => string;
}

const AddProductLine: React.FC<AddProductLineProps> = ({
  products,
  initialValue,
  onChange,
  onRemove,
  getUnitOf,
}) => {
  const [unit, setUnit] = useState(getUnitOf(initialValue));
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState(initialValue);

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
