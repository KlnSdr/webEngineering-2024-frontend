import { NeededProduct } from "../types/Products";
import {ProductsService} from "./ProductService";


class FridgeService {
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    public static getFridgeContent(userId: number): Promise<NeededProduct[]> {
        return new Promise((resolve, reject) => {
            fetch(`${this.backendURL}/fridge/${userId}`, {
                method: "GET",
                credentials: "include",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to load fridge content.");
                    }
                    return response.json();
                })
                .then(async (data: { userUri: string; products: Record<string, number> }) => {
                    const products: NeededProduct[] = [];

                    // Fetch product IDs for each product name
                    for (const [productName, amount] of Object.entries(data.products)) {
                        const productId = await ProductsService.getProductIdByName(productName);
                        if (productId !== null) {
                            products.push({
                                id: productId.id,
                                productName: productId.productName,
                                amount,
                            });
                        } else {
                            console.warn(`Product ID not found for ${productName}`);
                        }
                    }

                    resolve(products);
                })
                .catch((reason: any) => {
                    reject(reason);
                });
        });
    }

    public static updateFridgeContent(userId: number, products: NeededProduct[]): Promise<void> {
        return new Promise((resolve, reject) => {
            // Convert the products array to a map
            const productsMap: Record<string, number> = {};
            products.forEach((product) => {
                productsMap[product.productName] = product.amount;
            });

            fetch(`${this.backendURL}/fridge/${userId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userUri: `/users/${userId}`, products: productsMap }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to update fridge content.");
                    }
                    resolve();
                })
                .catch((reason: any) => {
                    reject(reason);
                });
        });
    }

}

export { FridgeService };
