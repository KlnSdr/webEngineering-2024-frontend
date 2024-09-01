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
  public static getAll1(): Promise<CreateRecipe[]> {
    return new Promise((resolve, reject) => {
      resolve([
          {
              title: "Käsesosse 1",
              image: null,
              description: "A delicious cheese sauce.",
              products: [
                  { id: 7, productName: "Cheese", amount: 1 },
                  { id: 4, productName: "Milk", amount: 1 },
                  { id: 6, productName: "Butter", amount: 1 },
              ],
          },
          {
              title: "Käsesosse 2",
              image: null,
              description: "Cheese sauce with salt.",
              products: [
                  { id: 7, productName: "Cheese", amount: 2 },
                  { id: 10, productName: "Salt", amount: 1 },
                  { id: 4, productName: "Milk", amount: 2 },
              ],
          },
          {
              title: "Käsesosse 3",
              image: null,
              description: "A spicy cheese sauce.",
              products: [
                  { id: 7, productName: "Cheese", amount: 2 },
                  { id: 11, productName: "Pepper", amount: 1 },
                  { id: 2, productName: "Milk", amount: 1 },
              ],
          },
          {
              title: "Käsesosse 4",
              image: null,
              description: "A mild cheese sauce.",
              products: [
                  { id: 7, productName: "Cheese", amount: 3 },
                  { id: 2, productName: "Milk", amount: 2 }
              ],
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

    public static searchRecipesByProducts(neededProducts: NeededProduct[]): Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            this.getAll1()
                .then((recipes) => {

                    const staticRecipes: Recipe[] = [
                        {
                            id: 1,
                            title: "Käsesosse 1",
                            description: "A delicious cheese sauce.",
                            image: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
                            isPrivate: false,
                            creationDate: new Date(),
                            ownerUri: "",
                            likedByUserUris: [],
                            products: [
                                { name: "Cheese", amount: 1, unit: "kg" },
                                { name: "Milk", amount: 1, unit: "l" },
                                { name: "Butter", amount: 0.5, unit: "kg" }, // Adjusted unit to kg
                            ],
                        },
                        {
                            id: 2,
                            title: "Käsesosse 2",
                            description: "Cheese sauce with salt.",
                            image: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
                            isPrivate: false,
                            creationDate: new Date(),
                            ownerUri: "",
                            likedByUserUris: [],
                            products: [
                                { name: "Cheese", amount: 2, unit: "kg" },
                                { name: "Salt", amount: 0.1, unit: "kg" }, // Adjusted unit to kg
                                { name: "Milk", amount: 2, unit: "l" },
                            ],
                        },
                        {
                            id: 3,
                            title: "Käsesosse 3",
                            description: "A spicy cheese sauce.",
                            image: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
                            isPrivate: false,
                            creationDate: new Date(),
                            ownerUri: "",
                            likedByUserUris: [],
                            products: [
                                { name: "Cheese", amount: 2, unit: "kg" },
                                { name: "Pepper", amount: 0.05, unit: "kg" }, // Adjusted unit to kg
                                { name: "Milk", amount: 1, unit: "l" },
                            ],
                        },
                        {
                            id: 4,
                            title: "Käsesosse 4",
                            description: "A mild cheese sauce.",
                            image: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
                            isPrivate: false,
                            creationDate: new Date(),
                            ownerUri: "",
                            likedByUserUris: [],
                            products: [
                                { name: "Cheese", amount: 3, unit: "kg" },
                                { name: "Milk", amount: 2, unit: "l" },
                            ],
                        },
                    ];

                    resolve(staticRecipes);
                })
                .catch((reason: any) => {
                    reject(reason);
                });
        });
    }
}

export { RecipeService };
