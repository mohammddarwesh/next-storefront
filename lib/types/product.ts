/**
 * Represents an option for a product variant (e.g., size, color)
 */
export interface ProductVariantOption {
  name: string;
  value: string;
}

/**
 * Represents a specific variant of a product with its own SKU and inventory
 */
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  options: ProductVariantOption[];
}

/**
 * Represents a product's rating and review count
 */
export interface ProductRating {
  rate: number;
  count: number;
}

/**
 * Key-value pairs of product specifications/attributes
 */
export interface ProductSpecifications {
  [key: string]: string;
}

/**
 * Represents a product in the store
 */
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
  slug?: string;
  images?: string[];
  compareAtPrice?: number;
  stock?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  tags?: string[];
  variants?: ProductVariant[];
  specifications?: ProductSpecifications;
  createdAt?: string;
  updatedAt?: string;
}