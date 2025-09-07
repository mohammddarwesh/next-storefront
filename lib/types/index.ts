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

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  // Additional fields for our application
  slug?: string;
  images?: string[];
  compareAtPrice?: number;
  stock?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  tags?: string[];
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  options: VariantOption[];
}

export interface VariantOption {
  name: string;
  value: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchParams {
  page?: string;
  limit?: string;
  sort?: string;
  search?: string;
  category?: string;
  [key: string]: string | string[] | undefined;
}
