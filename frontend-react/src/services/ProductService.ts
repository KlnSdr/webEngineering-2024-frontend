import { Product } from "../types/Products";

class ProductsService {
  public static getAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          name: "One",
          unit: "g",
        },
        {
          name: "Two",
          unit: "ml",
        },
        {
          name: "Three",
          unit: "stk",
        },
      ]);
    });
  }
}

export { ProductsService };
