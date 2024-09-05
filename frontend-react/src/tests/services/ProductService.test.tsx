import { ProductsService } from "../../services/ProductService";
import { Product } from "../../types/Products";

// Mocking the global fetch function
global.fetch = jest.fn();

describe("ProductsService", () => {
  const mockProducts: Product[] = [
    { name: "One", unit: "g", id: 0 },
    { name: "Two", unit: "ml", id: 1 },
    { name: "Three", unit: "stk", id: 2 },
  ];

  beforeEach(() => {
    // Clear the mock before each test to avoid any interference between tests
    (fetch as jest.Mock).mockClear();
  });

  test("getAll returns a list of products", async () => {
    // Mock the response from the fetch call
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const products = await ProductsService.getAll();
    expect(products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/products");
  });

  test("getAll returns products with correct properties", async () => {
    // Mock the response from the fetch call
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const products = await ProductsService.getAll();

    products.forEach((product) => {
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("unit");
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/products");
  });

  test("getAll throws an error if the network request fails", async () => {
    // Mock a failed network request
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(ProductsService.getAll()).rejects.toThrow(
      "Failed to load products."
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/products");
  });

  test("getAll throws an error if fetch rejects", async () => {
    // Mock a network error (fetch rejects)
    const mockError = new Error("Network Error");
    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(ProductsService.getAll()).rejects.toThrow(mockError);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/products");
  });

  // Tests for getProductIdByName
  test("getProductIdByName returns the correct product when name exists", async () => {
    // Mocking getAll() to return mockProducts
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const result = await ProductsService.getProductIdByName("One");

    expect(result).toEqual({
      id: 0,
      productName: "One",
      amount: 0,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/products");
  });

  test("getProductIdByName returns null when the product name does not exist", async () => {
    // Mocking getAll() to return mockProducts
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const result = await ProductsService.getProductIdByName("Unknown");

    expect(result).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:13000/products");
  });

});
