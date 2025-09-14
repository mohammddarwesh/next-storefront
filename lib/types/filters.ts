export type SortOrder = 'default' | 'price_asc' | 'price_desc';

export interface FilterParams {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortOrder;
  page: number;
  limit: number;
}

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}