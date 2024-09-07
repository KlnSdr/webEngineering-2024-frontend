import { Product } from "../types/Products";

class ProductsService {
    private static backendURL: string =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:13000";

    public static getAll(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            fetch(`${this.backendURL}/products`).then((response: Response) => {
                if (!response.ok) {
                    throw new Error("Failed to load products.");
                }
                return response.json();
            }).then((data: Product[]) => {
                console.log(data);
                resolve(data);
            }).catch((reason: any) => {
                reject(reason);
            });
        });
    }
}

export { ProductsService };
