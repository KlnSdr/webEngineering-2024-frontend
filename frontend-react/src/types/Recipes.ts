import { NeededProduct } from "./Products";

interface CreateRecipe {
  title: string;
  image: File | null;
  description: string;
  products: NeededProduct[];
}

export type { CreateRecipe };
