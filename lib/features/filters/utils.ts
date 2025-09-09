import { Product } from '@/lib/types';
import { SortOrder } from './filtersSlice';

export interface ApplyOptions {
  products: Product[];
  search?: string;
  category?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  sort?: SortOrder | string;
  page?: number;
  limit?: number;
}

function byPriceAsc(a: Product, b: Product) { return a.price - b.price; }
function byPriceDesc(a: Product, b: Product) { return b.price - a.price; }
function stable<T>(arr: T[], cmp: (a: T, b: T) => number) {
  return arr
    .map((item, idx) => ({ item, idx }))
    .sort((x, y) => {
      const d = cmp(x.item, y.item);
      return d !== 0 ? d : x.idx - y.idx;
    })
    .map(({ item }) => item);
}

export function applyFiltersSortPaginate({
  products,
  search,
  category,
  minPrice,
  maxPrice,
  sort,
  page = 1,
  limit = 12,
}: ApplyOptions) {
  let filtered = products.slice(0);

  if (category && category.length > 0) {
    const cat = decodeURIComponent(category).toLowerCase();
    filtered = filtered.filter(p => p.category.toLowerCase() === cat);
  }

  if (typeof minPrice === 'number') {
    filtered = filtered.filter(p => p.price >= (minPrice as number));
  }
  if (typeof maxPrice === 'number') {
    filtered = filtered.filter(p => p.price <= (maxPrice as number));
  }

  if (search && search.trim().length > 0) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  if (sort === 'price_asc') {
    filtered = stable(filtered, byPriceAsc);
  } else if (sort === 'price_desc') {
    filtered = stable(filtered, byPriceDesc);
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * limit;
  const pageItems = filtered.slice(start, start + limit);

  return { items: pageItems, total, currentPage, totalPages };
}
