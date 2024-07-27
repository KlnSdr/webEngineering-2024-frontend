import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Button from "./Button";

interface AddProductLineProps {
  products: string[];
}

const AddProductLine: React.FC<AddProductLineProps> = ({ products }) => {
  const [unit, setUnit] = useState("g");
  const [value, setValue] = useState("");

  return (
    <div>
      <Dropdown options={products} />
      <input
        type="number"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <label>{unit}</label>
      <Button text="entfernen" onClick={() => {}} />
    </div>
  );
};

export default AddProductLine;
