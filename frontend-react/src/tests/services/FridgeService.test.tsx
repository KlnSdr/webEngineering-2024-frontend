import { FridgeService } from "../../services/FridgeService";
import { ProductsService } from "../../services/ProductService";
import { NeededProduct, Product } from "../../types/Products";

// Mock global fetch
global.fetch = jest.fn();

// Mock ProductsService.getProductIdByName
jest.mock("../../services/ProductService", () => ({
    ProductsService: {
        getProductIdByName: jest.fn(),
    },
}));

const mockProducts: Product[] = [
    { name: "One", unit: "g", id: 0 },
    { name: "Two", unit: "ml", id: 1 },
    { name: "Three", unit: "stk", id: 2 },
];

const mockFridgeContentResponse = {
    userUri: "/users/1",
    products: { One: 5, Two: 10 },
};

const mockNeededProducts: NeededProduct[] = [
    { id: 0, productName: "One", amount: 5 },
    { id: 1, productName: "Two", amount: 10 },
];


describe("FridgeService", () => {
    const userId = 1;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    test("getFridgeContent successfully retrieves fridge content", async () => {
        // Mock the fetch call for fridge content
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockFridgeContentResponse,
        });

        // Mock the product ID lookups
        (ProductsService.getProductIdByName as jest.Mock).mockResolvedValueOnce({
            id: 0,
            productName: "One",
        });
        (ProductsService.getProductIdByName as jest.Mock).mockResolvedValueOnce({
            id: 1,
            productName: "Two",
        });

        const result = await FridgeService.getFridgeContent(userId);

        expect(result).toEqual(mockNeededProducts);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:13000/fridge/${userId}`, {
            method: "GET",
            credentials: "include",
        });
        expect(ProductsService.getProductIdByName).toHaveBeenCalledTimes(2);
        expect(ProductsService.getProductIdByName).toHaveBeenCalledWith("One");
        expect(ProductsService.getProductIdByName).toHaveBeenCalledWith("Two");
    });

    test("getFridgeContent handles missing product ID", async () => {
        // Mock the fetch call for fridge content
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockFridgeContentResponse,
        });

        // Mock the product ID lookup for "One"
        (ProductsService.getProductIdByName as jest.Mock).mockResolvedValueOnce({
            id: 0,
            productName: "One",
        });

        // Mock "Two" to return null (indicating no matching product ID found)
        (ProductsService.getProductIdByName as jest.Mock).mockResolvedValueOnce(null);

        const result = await FridgeService.getFridgeContent(userId);

        // Expect only "One" to be in the result, since "Two" wasn't found
        expect(result).toEqual([mockNeededProducts[0]]);
    });

    test("updateFridgeContent successfully updates fridge content", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        await FridgeService.updateFridgeContent(userId, mockNeededProducts);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:13000/fridge/${userId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userUri: `/users/${userId}`,
                products: { One: 5, Two: 10 },
            }),
        });
    });

    test("deleteFridgeProduct successfully deletes a product from the fridge", async () => {
        const productId = 0;

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        await FridgeService.deleteFridgeProduct(userId, productId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:13000/fridge/${userId}/product/${productId}`, {
            method: "DELETE",
            credentials: "include",
        });
    });

    test("getFridgeContent throws an error when fetching fails", async () => {
        // Mock fetch to return a failed response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(FridgeService.getFridgeContent(userId)).rejects.toThrow(
            "Failed to load fridge content."
        );
    });

});
