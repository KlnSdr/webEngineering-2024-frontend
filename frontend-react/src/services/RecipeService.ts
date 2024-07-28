import { CreateRecipe } from "../types/Recipes";

class RecipeService {
  public static save(recipe: CreateRecipe): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export { RecipeService };
