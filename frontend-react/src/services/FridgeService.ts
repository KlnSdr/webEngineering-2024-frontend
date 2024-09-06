import { NeededProduct } from "../types/Products";
import { ProductsService } from "./ProductService";

class FridgeService {
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    public static async getFridgeContent(userId: number): Promise<NeededProduct[]> {
        try {
            const response = await fetch(`${this.backendURL}/fridge/${userId}`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to load fridge content: ${response.statusText}`);
            }

            const products: NeededProduct[] = await response.json();
            console.log("Fetched fridge products:", products);
            return products;
        } catch (error) {
            console.error("Error fetching fridge content:", error);
            throw error;
        }
    }
}

export { FridgeService };
