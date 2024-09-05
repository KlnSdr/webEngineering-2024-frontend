import {useEffect, useState} from "react";
import AddProducts from "../components/AddProducts";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Heading from "../components/Heading";
import ImageUrl from "../components/ImageUrl";
import LabelInput from "../components/LabelInput";
import TextArea from "../components/TextArea";
import "../style/CreateRecipeView.css";
import { CreateRecipe, Recipe } from "../types/Recipes";
import { NeededProduct, Product } from "../types/Products";
import { ProductsService } from "../services/ProductService";
import Stack from "react-bootstrap/Stack";
import { RecipeService } from "../services/RecipeService";
import {UserService} from "../services/UserService";
import {useNavigate} from "react-router-dom";

function CreateRecipeView ({recipe}: {recipe: Recipe | null}) {
    const emptyRecipe: CreateRecipe = {
        title: "",
        image: null,
        description: "",
        products: [],
    };
if (recipe)
{
    emptyRecipe.title = recipe.title;
    emptyRecipe.image = recipe.imgUri;
    emptyRecipe.description = recipe.description;
    emptyRecipe.products = recipe.products.map((product) => ({
        id: product.id,
        productName: product.name,
        amount: product.amount
    }));
}
  const popUpTimeout: number = parseInt(process.env.REACT_APP_POPUP_TIMEOUT || "5000");
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
  }, [navigate]);

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

  const showPopUpFail = () => {
    setShowFailAlert(true);
    setTimeout(() => setShowFailAlert(false), popUpTimeout);
  };
  const saveRecipe = () => {
    if (validate()) {
        if(!recipe){
        const newRecipe: CreateRecipe = {
            ...state,
            products: state.products.map((product: NeededProduct) => {
                return {
                    ...product,
                    id: availableProducts.find((p: Product) => p.name === product.productName)?.id || 0
                };
            })
        };
      RecipeService.save(newRecipe)
        .then((storedRecipe: Recipe) => {
            navigate(`/recipe/view/${storedRecipe.id}`);
        })
        .catch((reason: any) => {
          console.log(reason);
          showPopUpFail();
        });
        } else{
          const updatedRecipe: Recipe = {
                id: recipe!.id,
                title: state.title,
                imgUri: state.image || "",
                description: state.description,
                products: state.products.map((product) => ({
                    id: product.id,
                    name: product.productName,
                    amount: product.amount,
                    unit: availableProducts.find((prod: Product) => prod.id === product.id)?.unit || ""
                })),
              isPrivate: recipe!.isPrivate,
              creationDate: recipe!.creationDate,
              ownerUri: recipe!.ownerUri,
              likedByUserUris: recipe!.likedByUserUris
          };
            RecipeService.updateRecipe(updatedRecipe).then((updatedRecipe: Recipe) => {
                navigate(`/recipe/view/${updatedRecipe.id}`);
                })
                .catch((reason: any) => {
                    console.log(reason);
                    showPopUpFail();
                });
            return;
        }
    } else {
        showPopUpFail();
    }
    }

  return (
    <div className="createRecipeView">
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
        <LabelInput labelText="Bild Url" initialValue={state.image || ""}
                    onChange={(val: string) => {
                        setState({ ...state, image: val });
                    }}/>
        {state.image ? <ImageUrl url={state.image} /> : null}
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
