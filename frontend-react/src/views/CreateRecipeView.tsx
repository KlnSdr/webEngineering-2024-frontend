import { useEffect, useState } from "react";
import AddProducts from "../components/AddProducts";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Heading from "../components/Heading";
import ImageUpload from "../components/ImageUpload";
import LabelInput from "../components/LabelInput";
import TextArea from "../components/TextArea";
import "../style/CreateRecipeView.css";
import { CreateRecipe } from "../types/Recipes";
import { NeededProduct, Product } from "../types/Products";
import { ProductsService } from "../services/ProductService";
import Stack from "react-bootstrap/Stack";
import { RecipeService } from "../services/RecipeService";
import {UserService} from "../services/UserService";
import {useNavigate} from "react-router-dom";

function CreateRecipeView() {
  const emptyRecipe: CreateRecipe = {
    title: "",
    image: null,
    description: "",
    products: [],
  };
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [state, setState] = useState(emptyRecipe);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
      UserService.isLoggedIn().then((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
              navigate("/login");
          }
      });

    ProductsService.getAll()
      .then((products: Product[]) =>
        setAvailableProducts([/*{ name: "", unit: "" },*/ ...products])
      )
      .catch((reason: any) => {
        console.error(reason);
        // TODO display error popup
      });
  }, []);

  const validate: () => boolean = () => {
    if (state.title.trim() === "") {
      return false;
    }

    if (state.description.trim() === "") {
      return false;
    }

    if (
      state.products.filter(
        (product: NeededProduct) => product.productName === ""
      ).length > 0
    ) {
      return false;
    }

    return true;
  };

  const showPopUpSuccess = () => {
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  const showPopUpFail = () => {
    setShowFailAlert(true);
    setTimeout(() => setShowFailAlert(false), 5000);
  };

  const saveRecipe = () => {
    if (validate()) {
      RecipeService.save(state)
        .then((_) => {
            // TODO redirect to detail view
          showPopUpSuccess();
        })
        .catch((reason: any) => {
          console.log(reason);
          showPopUpFail();
        });
    } else {
      showPopUpFail();
    }
  };

  return (
    <div className="createRecipeView">
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          Rezept erfolgreich gespeichert!
        </Alert>
      )}
      {showFailAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowFailAlert(false)}
          dismissible
        >
          Rezept konnte nicht gespeichert werden.
        </Alert>
      )}
      <LabelInput
        labelText="Title"
        initialValue={state.title}
        onChange={(val: string) => {
          setState({ ...state, title: val });
        }}
      />
      <ImageUpload
        initialValue={state.image}
        onChange={(img: string | null) => {
          setState({ ...state, image: img });
        }}
      />
      <Heading headingText="Zutaten" />
      <AddProducts
        initialValue={state.products}
        onChange={(products: NeededProduct[]) => {
          setState({ ...state, products: products });
        }}
        availableProducts={availableProducts}
      />
      <Heading headingText="Zubereitung" />
      <TextArea
        initialValue={state.description}
        onChange={(content: string) => {
          setState({ ...state, description: content });
        }}
      />
      <Stack direction="horizontal">
        <Button
          variant="secondary"
          onClick={() => {
            setState(emptyRecipe);
          }}
          className="ms-auto"
        >
          verwerfen
        </Button>
        <Button variant="primary" onClick={saveRecipe}>
          speichern
        </Button>
      </Stack>
    </div>
  );
}

export default CreateRecipeView;
