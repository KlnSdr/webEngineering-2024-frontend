import { NeededProduct } from "./Products";

interface CreateRecipe {
  title: string;
  image: string | null;
  description: string;
  products: NeededProduct[];
}

export type { CreateRecipe };
