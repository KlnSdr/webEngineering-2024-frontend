interface NeededProduct {
  id: number; // needed because react decided to be difficult today!
  productName: string;
  amount: number;
}

interface Product {
    name: string;
    unit: string;
}

export type { NeededProduct, Product };
