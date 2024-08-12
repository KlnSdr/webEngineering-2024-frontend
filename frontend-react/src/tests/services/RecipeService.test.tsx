import { RecipeService } from "../../services/RecipeService";
import { CreateRecipe } from "../../types/Recipes";

describe("RecipeService", () => {
    test("save resolves successfully with valid recipe", async () => {
        const recipe: CreateRecipe = {
            title: "Test Recipe",
            image: "data:image/png;base64,testImage",
            description: "Test description",
            products: [
                { id: 1, productName: "Product 1", amount: 100 },
                { id: 2, productName: "Product 2", amount: 200 },
            ],
        };

        await expect(RecipeService.save(recipe)).resolves.toBeUndefined();
    });

    test("save handles recipe with null image", async () => {
        const recipe: CreateRecipe = {
            title: "Recipe with No Image",
            image: null,
            description: "Description with no image",
            products: [
                { id: 3, productName: "Product 3", amount: 150 },
            ],
        };

        await expect(RecipeService.save(recipe)).resolves.toBeUndefined();
    });

    test("save handles empty fields", async () => {
        const recipe: CreateRecipe = {
            title: "",
            image: null,
            description: "",
            products: [],
        };

        await expect(RecipeService.save(recipe)).resolves.toBeUndefined();
    });

    test("save handles large input", async () => {
        const recipe: CreateRecipe = {
            title: "A".repeat(1000),
            image: "data:image/png;base64," + "B".repeat(1000),
            description: "C".repeat(1000),
            products: Array(1000).fill({ id: 1, productName: "Product", amount: 1 }),
        };

        await expect(RecipeService.save(recipe)).resolves.toBeUndefined();
    });
});
