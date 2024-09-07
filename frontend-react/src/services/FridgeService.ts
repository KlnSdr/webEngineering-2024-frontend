import { NeededProduct } from "../types/Products";

class FridgeService {
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    /**
     * Fetches the content of the fridge for a given user.
     *
     * @param {number} userId - The ID of the user whose fridge content is to be fetched.
     * @returns {Promise<NeededProduct[]>} A promise that resolves to the list of products in the fridge.
     */
    public static getFridgeContent(userId: number): Promise<NeededProduct[]> {
        return fetch(`${this.backendURL}/fridge/${userId}`, {
            method: "GET",
            credentials: "include",
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Failed to load fridge content: ${text}`);
                    });
                }
                return response.json();
            })
            .then((products: NeededProduct[]) => {
                console.log("Fetched fridge products:", products);
                return products;
            })
            .catch(error => {
                console.error("Error fetching fridge content:", error);
                throw error;
            });
    }

    /**
     * Updates the content of the fridge for a given user with new products.
     *
     * @param {number} userId - The ID of the user whose fridge is to be updated.
     * @param {NeededProduct[]} products - The list of products to update in the fridge.
     * @returns {Promise<void>} A promise that resolves when the update is complete.
     */
    public static updateFridgeContent(userId: number, products: NeededProduct[]): Promise<void> {
        // Convert the products array into a list of FridgeAddItemDTO objects
        const payload = products.map(product => ({
            productID: product.id,
            quantity: product.amount
        }));

        console.log("Payload for update:", JSON.stringify(payload, null, 2));

        return fetch(`${this.backendURL}/fridge/${userId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload), // Send the list of FridgeAddItemDTO objects
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(`Failed to update fridge content. ${errorData.error || ''}`);
                    });
                }
            })
            .catch(error => {
                console.error("Error updating fridge content:", error);
                throw error;
            });
    }

    /**
     * Deletes a product from the fridge for a given user.
     *
     * @param {number} userId - The ID of the user whose fridge product is to be deleted.
     * @param {number} productId - The ID of the product to be deleted.
     * @returns {Promise<void>} A promise that resolves when the product is deleted.
     */
    public static deleteFridgeProduct(userId: number, productId: number): Promise<void> {
        const payload = {
            userId: userId,
            productId: productId,
        };

        return fetch(`${this.backendURL}/fridge/${userId}/${productId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload), // Send only userId and productId as part of the request
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(`Failed to delete product from fridge: ${errorData.error || response.statusText}`);
                    });
                }
            })
            .catch(error => {
                console.error("Error deleting fridge product:", error);
                throw error;
            });
    }
}

export { FridgeService };
