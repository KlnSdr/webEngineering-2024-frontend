import { DetailedProduct, NeededProduct, Product } from "./Products";

/**
 * Interface representing the structure of a recipe to be created.
 */
interface CreateRecipe {
  /**
   * The title of the recipe.
   * @type {string}
   */
  title: string;

  /**
   * The image URL of the recipe.
   * @type {string | null}
   */
  image: string | null;

  /**
   * The description of the recipe.
   * @type {string}
   */
  description: string;

  /**
   * Indicates if the recipe is private.
   * @type {boolean}
   */
  isPrivate: boolean;

  /**
   * The list of needed products for the recipe.
   * @type {NeededProduct[]}
   */
  products: NeededProduct[];
}

/**
 * Interface representing the structure of a recipe.
 */
interface Recipe {
  /**
   * The unique identifier of the recipe.
   * @type {number}
   */
  id: number;

  /**
   * The title of the recipe.
   * @type {string}
   */
  title: string;

  /**
   * The description of the recipe.
   * @type {string}
   */
  description: string;

  /**
   * The image URL of the recipe.
   * @type {string}
   */
  imgUri: string;

  /**
   * Indicates if the recipe is private.
   * @type {boolean}
   */
  isPrivate: boolean;

  /**
   * The creation date of the recipe.
   * @type {Date}
   */
  creationDate: Date;

  /**
   * The URI of the owner of the recipe.
   * @type {string}
   */
  ownerUri: string;

  /**
   * The list of URIs of users who liked the recipe.
   * @type {string[]}
   */
  likedByUserUris: string[];

  /**
   * The list of detailed products for the recipe.
   * @type {DetailedProduct[]}
   */
  products: DetailedProduct[];
}

export type { CreateRecipe, Recipe };