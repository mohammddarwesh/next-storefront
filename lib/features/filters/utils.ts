import { Product } from '@/lib/types';
import { FilterParams, SortOrder } from '@/lib/types/filters';

export const filterByCategory = (products: Product[], category: string): Product[] => {
  if (!category) return products;
  const cat = decodeURIComponent(category).toLowerCase();
  return products.filter(p => p.category.toLowerCase() === cat);
};

export const filterByPrice = (products: Product[], minPrice: number | null, maxPrice: number | null): Product[] => {
  return products.filter(p => {
    if (typeof minPrice === 'number' && p.price < minPrice) return false;
    if (typeof maxPrice === 'number' && p.price > maxPrice) return false;
    return true;
  });
};

export const filterBySearch = (products: Product[], search: string): Product[] => {
  if (!search.trim()) return products;
  const q = search.trim().toLowerCase();
  return products.filter(p =>
    p.title.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q)
  );
};

export const sortProducts = (products: Product[], sort: SortOrder): Product[] => {
  if (sort === 'price_asc') return [...products].sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') return [...products].sort((a, b) => b.price - a.price);
  return products;
};

export const paginateProducts = (products: Product[], page: number, limit: number) => {
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * limit;
  const items = products.slice(start, start + limit);
  
  return { items, total, currentPage, totalPages };
};

export function applyFiltersSortPaginate(
  products: Product[],
  filters: Partial<FilterParams>
) {
  const {
    search = '',
    category = '',
    minPrice = null,
    maxPrice = null,
    sort = 'default',
    page = 1,
    limit = 12,
  } = filters;

  let filtered = filterByCategory(products, category);
  filtered = filterByPrice(filtered, minPrice, maxPrice);
  filtered = filterBySearch(filtered, search);
  filtered = sortProducts(filtered, sort);
  
  return paginateProducts(filtered, page, limit);
}