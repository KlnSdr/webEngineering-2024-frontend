import { CreateRecipe } from "../types/Recipes";
import { Recipe } from "../types/Recipes";
import {NeededProduct} from "../types/Products";

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

    public static searchRecipesByProducts(neededProducts: NeededProduct[]): Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            const productUris: string[] = neededProducts.map((product: NeededProduct) => `/products/${product.id}`);
            fetch(`${this.backendURL}/search/recipes/by-products`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productUris),
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to search recipes.");
                }
                return response.json();
            }).then((data: Recipe[]) => {
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }

  public static getRecipeById(id: string): Promise<Recipe> {
    return new Promise((resolve, reject) => {
      fetch(`${this.backendURL}/recipes/${id}`).then((response: Response) => {
          if (!response.ok) {
            throw new Error("Failed to load recipe.");
          }
          return response.json();
        }).then((data: Recipe) => {
          resolve(data);
        })
        .catch((reason: any) => {
          reject(reason);
        });
    });
  }
}

export { RecipeService };
