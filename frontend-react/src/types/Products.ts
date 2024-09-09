/**
 * Interface representing a needed product.
 */
interface NeededProduct {
  /**
   * The unique identifier of the product.
   * @type {number}
   */
  id: number; // needed because react decided to be difficult today!

  /**
   * The name of the product.
   * @type {string}
   */
  productName: string;

  /**
   * The amount of the product needed.
   * @type {number}
   */
  amount: number;
}

/**
 * Interface representing a product.
 */
interface Product {
    /**
     * The name of the product.
     * @type {string}
     */
    name: string;

    /**
     * The unit of measurement for the product.
     * @type {string}
     */
    unit: string;

    /**
     * The unique identifier of the product.
     * @type {number}
     */
    id: number;
}

/**
 * Interface representing a detailed product.
 */
interface DetailedProduct {
    /**
     * The unique identifier of the product.
     * @type {number}
     */
    id: number;

    /**
     * The name of the product.
     * @type {string}
     */
    name: string;

    /**
     * The amount of the product.
     * @type {number}
     */
    amount: number;

    /**
     * The unit of measurement for the product.
     * @type {string}
     */
    unit: string;
}

export type { NeededProduct, Product, DetailedProduct };