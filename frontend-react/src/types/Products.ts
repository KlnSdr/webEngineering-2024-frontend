interface NeededProduct {
  id: number; // needed because react decided to be difficult today!
  productName: string;
  amount: number;
}

interface Product {
    name: string;
    unit: string;
    id: number;
}

interface DetailedProduct {
    name: string;
    amount: number;
    unit: string;
}

export type { NeededProduct, Product, DetailedProduct };
