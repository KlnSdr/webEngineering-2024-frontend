import { Product } from "../types/Products";

class ProductsService {
  public static getAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:13000/products").then((response: Response) => {
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
