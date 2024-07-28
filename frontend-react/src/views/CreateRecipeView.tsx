import { useState } from "react";
import AddProducts from "../components/AddProducts";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ImageUpload from "../components/ImageUpload";
import LabelInput from "../components/LabelInput";
import TextArea from "../components/TextArea";
import "../style/CreateRecipeView.css";
import { CreateRecipe } from "../types/Recipes";
import { NeededProduct } from "../types/Products";

function CreateRecipeView() {
  const emptyRecipe: CreateRecipe = {
    title: "",
    image: null,
    description: "",
    products: [],
  };
  const [state, setState] = useState(emptyRecipe);

  return (
    <div className="createRecipeView">
      <LabelInput
        labelText="Title"
        initialValue=""
        onChange={(val: string) => {
          setState({ ...state, title: val });
        }}
      />
      <ImageUpload
        onChange={(img: File | null) => {
          setState({ ...state, image: img });
        }}
      />
      <Heading headingText="Zutaten" />
      <AddProducts
        onChange={(products: NeededProduct[]) => {
          setState({ ...state, products: products });
        }}
      />
      <Heading headingText="Zubereitung" />
      <TextArea
        initialValue="test"
        onChange={(content: string) => {
          setState({ ...state, description: content });
        }}
      />
      <Button
        text="verwerfen"
        onClick={() => {
          console.log("verwerfen");
        }}
      />
      <Button
        text="speichern"
        onClick={() => {
          console.log(state);
        }}
      />
    </div>
  );
}

export default CreateRecipeView;
