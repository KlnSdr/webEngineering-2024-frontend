import { CreateRecipe } from "../types/Recipes";

class RecipeService {
  public static save(recipe: CreateRecipe): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:13000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      })
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error("Could not save recipe.");
          }
          return response.json();
        })
        .then((data: any) => {
          console.log(data);
          resolve();
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  }
  public static getAll(): Promise<CreateRecipe[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          title: "Käsesoße 1",
          image: null,
          description: "Description 1",
          products: [],
        },
        {
          title: "Käsesoße 2",
          image: null,
          description: "Description 2",
          products: [],
        },
        {
          title: "Käsesosse 3",
          image: null,
          description: "Description 3",
          products: [],
        },
        {
          title: "Käsesosse 4",
          image: null,
          description: "Description 3",
          products: [],
        },
      ]);
    });
  }
}

export { RecipeService };
