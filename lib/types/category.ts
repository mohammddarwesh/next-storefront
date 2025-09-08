/**
 * Represents a product category in the store
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
