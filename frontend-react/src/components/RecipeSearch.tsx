import React from "react";
import LabelInput from "./LabelInput";

interface RecipeSearchProps {
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({}) => {
    const doSearch = (searchString: string) => {
        if(searchString.length < 3) {
            return;
        }
        console.log("searching for: " + searchString);
    };

    return (<div>
            <LabelInput labelText={"Rezepte suchen"} initialValue={""} onChange={doSearch}/>
        </div>);
}

export default RecipeSearch;
