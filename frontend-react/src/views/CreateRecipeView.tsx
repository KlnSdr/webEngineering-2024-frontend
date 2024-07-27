import AddProducts from "../components/AddProducts";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ImageUpload from "../components/ImageUpload";
import LabelInput from "../components/LabelInput";
import TextArea from "../components/TextArea";
import "../style/CreateRecipeView.css";

function CreateRecipeView() {
  return (
    <div className="createRecipeView">
      <LabelInput
        labelText="Title"
        initialValue="Hellow orld"
        onChange={(val) => console.log(val)}
      />
      <ImageUpload />
      <Heading headingText="Zutaten" />
      <AddProducts />
      <Heading headingText="Zubereitung" />
      <TextArea initialValue="test" />
      <Button
        text="verwerfen"
        onClick={() => {
          console.log("verwerfen");
        }}
      />
      <Button
        text="speichern"
        onClick={() => {
          console.log("speichern");
        }}
      />
    </div>
  );
}

export default CreateRecipeView;
