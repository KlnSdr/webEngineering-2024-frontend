import React, { useState } from "react";
import AddProductLine from "./AddProductLine";
import Button from "./Button";

interface AddProductsProps {}

const AddProducts: React.FC<AddProductsProps> = () => {
  const [neededProducts, setNeededProducts] = useState([""]);

  return (
    <div>
      {neededProducts.map((product: string) => {
        return <AddProductLine products={["one", "two", "three"]} />;
      })}

      <Button
        text="+"
        onClick={() => {
          setNeededProducts([...neededProducts, ""]);
        }}
      />
    </div>
  );
};

export default AddProducts;
