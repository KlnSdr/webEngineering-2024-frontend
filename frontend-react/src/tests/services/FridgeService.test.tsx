import { FridgeService } from "../../services/FridgeService";
import { NeededProduct } from "../../types/Products";

// Mock global fetch
global.fetch = jest.fn();

// Mock ProductsService.getProductIdByName
jest.mock("../../services/ProductService", () => ({
    ProductsService: {
        getProductIdByName: jest.fn(),
    },
}));

const mockProducts: NeededProduct[] = [
    { id: 0, productName: "One", amount: 5 },
    { id: 1, productName: "Two", amount: 10 },
];

const mockFridgeContentResponse = mockProducts;

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

        const result = await FridgeService.getFridgeContent(userId);

        expect(result).toEqual(mockFridgeContentResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:13000/fridge/${userId}`, {
            method: "GET",
            credentials: "include",
        });
    });

    test("getFridgeContent handles fetch error", async () => {
        // Mock fetch to return a failed response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: "Not Found",
            text: () => Promise.resolve("Not Found"),
        });

        await expect(FridgeService.getFridgeContent(userId)).rejects.toThrow(
            "Failed to load fridge content: Not Found"
        );
    });


    test("updateFridgeContent successfully updates fridge content", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        const payload = mockProducts.map(product => ({
            productID: product.id,
            quantity: product.amount
        }));

        await FridgeService.updateFridgeContent(userId, mockProducts);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:13000/fridge/${userId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    });

    test("updateFridgeContent handles update error", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Update failed" }),
        });

        await expect(FridgeService.updateFridgeContent(userId, mockProducts)).rejects.toThrow(
            "Failed to update fridge content. Update failed"
        );
    });

    test("deleteFridgeProduct successfully deletes a product from the fridge", async () => {
        const productId = 0;

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        await FridgeService.deleteFridgeProduct(userId, productId);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:13000/fridge/${userId}/${productId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, productId }), // Note: Typically DELETE requests don't include a body
        });
    });

    test("deleteFridgeProduct handles delete error", async () => {
        const productId = 0;

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Delete failed" }),
        });

        await expect(FridgeService.deleteFridgeProduct(userId, productId)).rejects.toThrow(
            "Failed to delete product from fridge: Delete failed"
        );
    });

});
