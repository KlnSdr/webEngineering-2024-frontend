import { RecipeService } from "../../services/RecipeService";
import { CreateRecipe } from "../../types/Recipes";

// Mocking the global fetch function
global.fetch = jest.fn();

describe("RecipeService", () => {
  const mockResponse = { message: "Recipe saved successfully" };

  beforeEach(() => {
    // Clear the mock before each test to avoid any interference between tests
    (fetch as jest.Mock).mockClear();
  });

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

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await expect(RecipeService.save(recipe)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  });

  test("save handles recipe with null image", async () => {
    const recipe: CreateRecipe = {
      title: "Recipe with No Image",
      image: null,
      description: "Description with no image",
      products: [{ id: 3, productName: "Product 3", amount: 150 }],
    };

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await expect(RecipeService.save(recipe)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  });

  test("save handles empty fields", async () => {
    const recipe: CreateRecipe = {
      title: "",
      image: null,
      description: "",
      products: [],
    };

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await expect(RecipeService.save(recipe)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  });

  test("save handles large input", async () => {
    const recipe: CreateRecipe = {
      title: "A".repeat(1000),
      image: "data:image/png;base64," + "B".repeat(1000),
      description: "C".repeat(1000),
      products: Array(1000).fill({ id: 1, productName: "Product", amount: 1 }),
    };

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await expect(RecipeService.save(recipe)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  });

  test("save throws an error if the network request fails", async () => {
    const recipe: CreateRecipe = {
      title: "Test Recipe",
      image: "data:image/png;base64,testImage",
      description: "Test description",
      products: [
        { id: 1, productName: "Product 1", amount: 100 },
        { id: 2, productName: "Product 2", amount: 200 },
      ],
    };

    // Mock a failed network request
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(RecipeService.save(recipe)).rejects.toThrow(
      "Could not save recipe."
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  });

  test("save throws an error if fetch rejects", async () => {
    const recipe: CreateRecipe = {
      title: "Test Recipe",
      image: "data:image/png;base64,testImage",
      description: "Test description",
      products: [
        { id: 1, productName: "Product 1", amount: 100 },
        { id: 2, productName: "Product 2", amount: 200 },
      ],
    };

    // Mock a network error (fetch rejects)
    const mockError = new Error("Network Error");
    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(RecipeService.save(recipe)).rejects.toThrow(mockError);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
  });
    test("getAll resolves successfully", async () => {
        await expect(RecipeService.getAll()).resolves.toEqual([
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
});
