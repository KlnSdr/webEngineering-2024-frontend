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
        });

        await expect(FridgeService.getFridgeContent(userId)).rejects.toThrow(
            "Failed to load fridge content: Not Found"
        );
    });

});
