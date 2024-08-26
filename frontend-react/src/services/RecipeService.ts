import { CreateRecipe } from "../types/Recipes";
import { Recipe } from "../types/Recipes";

class RecipeService {
  private static backendURL: string =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

  public static save(recipe: CreateRecipe): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${this.backendURL}/recipes`, {
        method: "POST",
        credentials: "include",
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
  public static getAll1(): Promise<CreateRecipe[]> {
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

  public static getAll():Promise<Recipe[]> {
    return new Promise((resolve, reject) => {
      fetch(`${this.backendURL}/recipes`).then((response: Response) => {
          if (!response.ok) {
            throw new Error("Failed to load recipes.");
          }
          return response.json();
        }).then((data: Recipe[]) => {
          resolve(data);
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  }
}

export { RecipeService };
