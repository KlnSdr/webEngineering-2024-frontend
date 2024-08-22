import React from "react";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

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
            <td>{ingredient.amount}</td>
            <td>{ingredient.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default IngredientsTable;