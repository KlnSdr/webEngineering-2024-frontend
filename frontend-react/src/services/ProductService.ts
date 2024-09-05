import {NeededProduct, Product} from "../types/Products";

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
  
  //get Id from product
    public static getProductIdByName(productName: string): Promise<NeededProduct | null> {
        return this.getAll().then(products => {
            const product = products.find(prod => prod.name.toLowerCase() === productName.toLowerCase());
            return product ? { id: product.id, productName: product.name, amount: 0 } : null;
        });
    }

}

export { ProductsService };
