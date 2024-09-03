import {DetailedProduct, NeededProduct, Product} from "./Products";

interface CreateRecipe {
  title: string;
  image: string | null;
  description: string;

  products: NeededProduct[];
}

interface Recipe {
    id: number;
    title: string;
    description: string;
    imgUri: string;
    isPrivate: boolean;
    creationDate: Date;
    ownerUri: string;
    likedByUserUris: string[];
    products: DetailedProduct[];
}

export type { CreateRecipe,Recipe };
