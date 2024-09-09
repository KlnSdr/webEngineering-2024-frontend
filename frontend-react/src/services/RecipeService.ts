import { CreateRecipe } from "../types/Recipes";
import { Recipe } from "../types/Recipes";
import { NeededProduct } from "../types/Products";
import { authorizedRequest } from "./Requests";

/**
 * Service class for handling recipe-related operations.
 */
class RecipeService {
    /**
     * The backend URL for the recipe service.
     * @type {string}
     * @private
     */
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    /**
     * Saves a new recipe to the backend.
     * @param {CreateRecipe} recipe - The recipe to save.
     * @returns {Promise<Recipe>} A promise that resolves to the saved recipe.
     */
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

    /**
     * Searches for recipes by text.
     * @param {string} searchString - The search string to use for finding recipes.
     * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes.
     */
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

    /**
     * Searches for recipes by products.
     * @param {NeededProduct[]} neededProducts - The products needed for the recipes.
     * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes.
     */
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

    /**
     * Fetches a recipe by its ID.
     * @param {string} id - The ID of the recipe.
     * @returns {Promise<Recipe>} A promise that resolves to the fetched recipe.
     */
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

    /**
     * Updates an existing recipe.
     * @param {Recipe} recipe - The recipe to update.
     * @returns {Promise<Recipe>} A promise that resolves to the updated recipe.
     */
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

    /**
     * Deletes a recipe by its ID.
     * @param {number} id - The ID of the recipe to delete.
     * @returns {Promise<void>} A promise that resolves when the recipe is deleted.
     */
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

    /**
     * Fetches recipes by user ID.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<Recipe[]>} A promise that resolves to an array of recipes.
     */
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