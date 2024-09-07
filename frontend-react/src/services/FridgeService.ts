import { NeededProduct } from "../types/Products";

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

    public static async updateFridgeContent(userId: number, products: NeededProduct[]): Promise<void> {
        try {
            // Convert the products array into a list of FridgeAddItemDTO objects
            const payload = products.map(product => ({
                productID: product.id,
                quantity: product.amount
            }));

            console.log("Payload for update:", JSON.stringify(payload, null, 2));

            const response = await fetch(`${this.backendURL}/fridge/${userId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // Send the list of FridgeAddItemDTO objects
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response body:", errorData);
                throw new Error(`Failed to update fridge content. ${errorData.error || ''}`);
            }
        } catch (error) {
            console.error("Error updating fridge content:", error);
            throw error;
        }
    }

    public static async deleteFridgeProduct(userId: number, productId: number): Promise<void> {
        try {
            const payload = {
                userId: userId,
                productId: productId,
            };

            const response = await fetch(`${this.backendURL}/fridge/${userId}/${productId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // Send only userId and productId as part of the request
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to delete product from fridge: ${errorData.error || response.statusText}`);
            }
        } catch (error) {
            console.error("Error deleting fridge product:", error);
            throw error;
        }
    }
}

export { FridgeService };
