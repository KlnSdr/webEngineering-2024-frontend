import { ProductsService } from "../../services/ProductService";
import { Product } from "../../types/Products";

describe("ProductsService", () => {
    test("getAll returns a list of products", async () => {
        const expectedProducts: Product[] = [
            { name: "One", unit: "g" },
            { name: "Two", unit: "ml" },
            { name: "Three", unit: "stk" },
        ];

        const products = await ProductsService.getAll();
        expect(products).toEqual(expectedProducts);
    });

    test("getAll returns products with correct properties", async () => {
        const products = await ProductsService.getAll();

        products.forEach(product => {
            expect(product).toHaveProperty("name");
            expect(product).toHaveProperty("unit");
        });
    });
});
