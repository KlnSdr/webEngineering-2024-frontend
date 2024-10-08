import { RecipeService } from "../../services/RecipeService";
import { CreateRecipe } from "../../types/Recipes";
import {NeededProduct} from "../../types/Products";
import { Recipe } from "../../types/Recipes";

// Mocking the global fetch function
global.fetch = jest.fn();

describe("RecipeService", () => {
  const mockResponse = { message: "Recipe saved successfully" };
  const mockRecipes = [
    {
      title: "Recipe 1",
      image: null,
      description: "Description 1",
      products: [],
    },
    {
      title: "Recipe 2",
      image: null,
      description: "Description 2",
      products: [],
    },
  ];

  const mockCreateRecipe = {
    title: "Test Recipe",
    imgUri: "data:image/png;base64,testImage",
    description: "Test description",
    isPrivate: false,
    productUris: ["/products/1", "/products/2"],
    productQuantities: {
      "/products/1": 100,
        "/products/2": 200
    }
  };

  beforeEach(() => {
    // Clear the mock before each test to avoid any interference between tests
    (fetch as jest.Mock).mockClear();
  });

  test("save resolves successfully with valid recipe", async () => {
    const recipe: CreateRecipe = {
      title: "Test Recipe",
      image: "data:image/png;base64,testImage",
      description: "Test description",
      isPrivate: false,
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

    await expect(RecipeService.save(recipe)).resolves.toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockCreateRecipe),
    });
  });

  test("save handles recipe with null image", async () => {
    const recipe: CreateRecipe = {
      title: "Recipe with No Image",
      image: null,
      description: "Description with no image",
      isPrivate: false,
      products: [{ id: 3, productName: "Product 3", amount: 150 }],
    };

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await expect(RecipeService.save(recipe)).resolves.toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...mockCreateRecipe,
        title: "Recipe with No Image",
        imgUri: null,
        description: "Description with no image",
        productUris: ["/products/3"],
        productQuantities: {
          "/products/3": 150,
        },
      }),
    });
  });

  test("save handles large input", async () => {
    const recipe: CreateRecipe = {
      title: "A".repeat(1000),
      image: "data:image/png;base64," + "B".repeat(1000),
      description: "C".repeat(1000),
      isPrivate: false,
      products: Array(1000).fill({ id: 1, productName: "Product", amount: 1 }),
    };

    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await expect(RecipeService.save(recipe)).resolves.toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...mockCreateRecipe,
        title: "A".repeat(1000),
        imgUri: "data:image/png;base64," + "B".repeat(1000),
        description: "C".repeat(1000),
        productUris: Array(1000).fill("/products/1"),
        productQuantities: Array(1000).fill(1).reduce((obj, _, i) => {
          obj[`/products/1`] = 1;
          return obj;
        }, {}),
      }),
    });
  });

  test("save throws an error if the network request fails", async () => {
    const recipe: CreateRecipe = {
      title: "Test Recipe",
      image: "data:image/png;base64,testImage",
      description: "Test description",
      isPrivate: false,
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
      body: JSON.stringify(mockCreateRecipe),
    });
  });

  test("save throws an error if fetch rejects", async () => {
    const recipe: CreateRecipe = {
      title: "Test Recipe",
      image: "data:image/png;base64,testImage",
      description: "Test description",
      isPrivate: false,
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
      body: JSON.stringify(mockCreateRecipe),
    });
  });

  //Static recipes for testing
  const fixedDate = new Date('2024-08-29T22:21:23.840Z');
  const staticRecipes : Recipe[] = [
    {
      id: 1,
      title: "Käsesosse 1",
      description: "A delicious cheese sauce.",
      imgUri: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
      isPrivate: false,
      creationDate: fixedDate,
      ownerUri: "",
      likedByUserUris: [],
      products: [
        { id: 1, name: "Cheese", amount: 1, unit: "kg" },
        { id: 1, name: "Milk", amount: 1, unit: "l" },
        { id: 1, name: "Butter", amount: 0.5, unit: "kg" }, // Adjusted unit to kg
      ],
    },
    {
      id: 2,
      title: "Käsesosse 2",
      description: "Cheese sauce with salt.",
      imgUri: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
      isPrivate: false,
      creationDate: fixedDate,
      ownerUri: "",
      likedByUserUris: [],
      products: [
        { id: 1, name: "Cheese", amount: 2, unit: "kg" },
        { id: 1, name: "Salt", amount: 0.1, unit: "kg" }, // Adjusted unit to kg
        { id: 1, name: "Milk", amount: 2, unit: "l" },
      ],
    },
    {
      id: 3,
      title: "Käsesosse 3",
      description: "A spicy cheese sauce.",
      imgUri: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
      isPrivate: false,
      creationDate: fixedDate,
      ownerUri: "",
      likedByUserUris: [],
      products: [
        { id: 1,  name: "Cheese", amount: 2, unit: "kg" },
        { id: 1,  name: "Pepper", amount: 0.05, unit: "kg" }, // Adjusted unit to kg
        { id: 1,  name: "Milk", amount: 1, unit: "l" },
      ],
    },
    {
      id: 4,
      title: "Käsesosse 4",
      description: "A mild cheese sauce.",
      imgUri: "https://elavegan.com/de/wp-content/uploads/sites/5/2018/03/vegane-K%C3%A4sesauce-einfaches-Rezept-paleo-glutenfrei.jpg",
      isPrivate: false,
      creationDate: fixedDate,
      ownerUri: "",
      likedByUserUris: [],
      products: [
        { id: 1,  name: "Cheese", amount: 3, unit: "kg" },
        { id: 1,  name: "Milk", amount: 2, unit: "l" }
      ],
    },
  ];

  test("searchRecipesByProducts returns all static recipes", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => staticRecipes,
    });

    const neededProducts: NeededProduct[] = [
      { id: 1, productName: "Cheese", amount: 1 },
      { id: 2, productName: "Milk", amount: 1 },
    ];

    const results = await RecipeService.searchRecipesByProducts(neededProducts);

    const mockCreationDate = fixedDate;

    const resultsWithMockDate = results.map(recipe => ({
      ...recipe,
      creationDate: mockCreationDate
    }));

    expect(resultsWithMockDate).toEqual(staticRecipes);
  });

  test("getRecipeById resolves successfully with valid recipe", async () => {
    const recipeId = "1";
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipes[0],
    });

    const recipe = await RecipeService.getRecipeById(recipeId);
    expect(recipe).toEqual(mockRecipes[0]);
  });
  test("getRecipeById throws an error if the network request fails", async () => {
    const recipeId = "1";
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(RecipeService.getRecipeById(recipeId)).rejects.toThrow(
        "Failed to load recipe."
    );
  });

  test("getRecipeByUser resolves successfully with valid recipe", async () => {
    const userId = 1;
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipes,
    });
    await expect(RecipeService.getRecipeByUser(userId)).resolves.toEqual(mockRecipes);
  });
    test("getRecipeByUser throws an error if the network request fails", async () => {
        const userId = 1;
        (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        });

        await expect(RecipeService.getRecipeByUser(userId)).rejects.toThrow(
            "Failed to load recipes."
        );
    });
    test("deleteRecipe resolves successfully with valid recipe", async () => {
        const recipeId = 1;
        (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecipes[0],
        });

        await expect(RecipeService.deleteRecipe(recipeId)).resolves.toEqual(undefined);
    });

    test("deleteRecipe throws an error if the network request fails", async () => {
        const recipeId = 1;
        (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        });

        await expect(RecipeService.deleteRecipe(recipeId)).rejects.toThrow(
            "Failed to delete recipe."
        );
    });
});
