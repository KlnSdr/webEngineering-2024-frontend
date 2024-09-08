import { CreateRecipe } from "../types/Recipes";
import { Recipe } from "../types/Recipes";
import {NeededProduct} from "../types/Products";
import {authorizedRequest} from "./Requests";

class RecipeService {
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    public static save(recipe: CreateRecipe): Promise<Recipe> {
      const quantityMap: { [key: string]: number } = {};
        recipe.products.forEach((product) => {
            quantityMap[`/products/${product.id}`] = product.amount;
        });
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/recipes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
            title: recipe.title,
            imgUri: recipe.image,
            description: recipe.description,
            isPrivate: recipe.isPrivate,
            productUris: recipe.products.map((product) => `/products/${product.id}`),
            productQuantities: quantityMap

        }),
            })
                .then((response: Response) => {
                    if (!response.ok) {
                        throw new Error("Could not save recipe.");
                    }
                    return response.json();
                })
                .then((data: Recipe) => {
                    resolve(data);
                })
                .catch((reason: any) => {
                    reject(reason);
                });
        });
    }

    public static searchRecipesByText(searchString: string): Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/search/recipes?searchString=${searchString}`).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to search recipes.");
                }
                return response.json();
            })
                .then((data: Recipe[]) => {
                    resolve(data);
                }).catch((reason: any) => {
                reject(reason);
            });
        });
    }

    public static searchRecipesByProducts(neededProducts: NeededProduct[]): Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            const productUris: string[] = neededProducts.map((product: NeededProduct) => `/products/${product.id}`);
            authorizedRequest(`${this.backendURL}/search/recipes/by-products`, {
                method: "POST",
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
            authorizedRequest(`${this.backendURL}/recipes/${id}`).then((response: Response) => {
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

    public static updateRecipe(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            const quantityMap: { [key: string]: number } = {};
            recipe.products.forEach((product) => {
                quantityMap[`/products/${product.id}`] = product.amount;
            });
            authorizedRequest(`${this.backendURL}/recipes/${recipe.id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: recipe.id,
                    title: recipe.title,
                    imgUri: recipe.imgUri,
                    description: recipe.description,
                    isPrivate: recipe.isPrivate,
                    productUris: recipe.products.map((product) => `/products/${product.id}`),
                    productQuantities: quantityMap
                }),
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to update recipe.");
                }
                return response.json();
            }).then((data: any) => {
                resolve(data);
            })
                .catch((reason: any) => {
                    reject(reason);
                });
        });
    }

    public static deleteRecipe(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/recipes/${id}`, {
                method: "DELETE",
            }).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete recipe.");
                }
                resolve();
            })
                .catch((reason: any) => {
                    reject(reason);
                });
        });
    }
    public static getRecipeByUser(userId: number): Promise<Recipe[]> {
        return new Promise((resolve, reject) => {
            authorizedRequest(`${this.backendURL}/recipes/user/${userId}`, {
                method: "GET",
            }).then((response: Response) => {
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
