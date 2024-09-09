import React from "react";

/**
 * Interface representing a single ingredient.
 * @typedef {Object} Ingredient
 * @property {string} name - The name of the ingredient.
 * @property {number} amount - The amount of the ingredient.
 * @property {string} unit - The unit of the ingredient amount.
 */
interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

/**
 * Props for the IngredientsTable component.
 * @typedef {Object} IngredientsTableProps
 * @property {Ingredient[]} ingredients - The list of ingredients to display in the table.
 */
interface IngredientsTableProps {
  ingredients: Ingredient[];
}

/**
 * IngredientsTable component renders a table of ingredients.
 * @param {IngredientsTableProps} props - The props for the component.
 * @returns {JSX.Element} The rendered IngredientsTable component.
 */
const IngredientsTable: React.FC<IngredientsTableProps> = ({ ingredients }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Zutat</th>
          <th>Menge</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((ingredient, index) => (
          <tr key={index}>
            <td>{ingredient.name}</td>
            <td>{ingredient.amount} {ingredient.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IngredientsTable;