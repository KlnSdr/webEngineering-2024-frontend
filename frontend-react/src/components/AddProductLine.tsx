import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Button from "./Button";

interface AddProductLineProps {
  products: string[];
  initialValue: string;
  onChange: (product: string, amount: number) => void;
  onRemove: () => void;
}

const AddProductLine: React.FC<AddProductLineProps> = ({
  products,
  initialValue,
  onChange,
  onRemove,
}) => {
  const [unit, setUnit] = useState("g");
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState(initialValue);

  return (
    <div>
      <Dropdown
        options={products}
        initialValue={product}
        onChange={(val: string) => {
          setProduct(val);
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
      />
      <label>{unit}</label>
      <Button
        text="entfernen"
        onClick={() => {
          onRemove();
        }}
      />
    </div>
  );
};

export default AddProductLine;
