import { useEffect, useState } from "react";
import AddProducts from "../components/AddProducts";
import Button from "react-bootstrap/Button";
import Heading from "../components/Heading";
import ImageUpload from "../components/ImageUpload";
import LabelInput from "../components/LabelInput";
import TextArea from "../components/TextArea";
import "../style/CreateRecipeView.css";
import { CreateRecipe } from "../types/Recipes";
import { NeededProduct, Product } from "../types/Products";
import { ProductsService } from "../services/ProductService";
import Stack from "react-bootstrap/Stack";

function CreateRecipeView() {
  const emptyRecipe: CreateRecipe = {
    title: "",
    image: null,
    description: "",
    products: [],
  };
  const [state, setState] = useState(emptyRecipe);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductsService.getAll().then((products: Product[]) =>
      setAvailableProducts(products)
    );
  }, []);

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
        availableProducts={availableProducts}
      />
      <Heading headingText="Zubereitung" />
      <TextArea
        initialValue=""
        onChange={(content: string) => {
          setState({ ...state, description: content });
        }}
      />
          <Stack
          direction="horizontal"
      >
        <Button
          variant="secondary"
          onClick={() => {
            console.log("verwerfen");
          }}
        className="ms-auto"
        >
          verwerfen
        </Button>
        <Button
          onClick={() => {
            console.log(state);
          }}
        >
          speichern
        </Button>
      </Stack>
    </div>
  );
}

export default CreateRecipeView;
