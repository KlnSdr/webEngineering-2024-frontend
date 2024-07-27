import Heading from "../components/Heading";
import LabelInput from "../components/LabelInput";
import "../style/CreateRecipeView.css";

function CreateRecipeView() {
  return (
    <div className="createRecipeView">
      <LabelInput
        labelText="Title"
        initialValue="Hellow orld"
        onChange={(val) => console.log(val)}
      />
      <Heading headingText="Zutaten" />
      <Heading headingText="Zubereitung" />
    </div>
  );
}

export default CreateRecipeView;
