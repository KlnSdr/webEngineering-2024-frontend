import { Product } from "../types/Products";
import { request } from "./Requests";

/**
 * Service class for handling product-related operations.
 */
class ProductsService {
    /**
     * The backend URL for the product service.
     * @type {string}
     * @private
     */
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    /**
     * Fetches all products from the backend.
     * @returns {Promise<Product[]>} A promise that resolves to an array of products.
     */
    public static getAll(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            request(`${this.backendURL}/products`).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to load products.");
                }
                return response.json();
            }).then((data: Product[]) => {
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }
}

export { ProductsService };