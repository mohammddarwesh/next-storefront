import { FilterParams, SortOrder } from '@/lib/types/filters';

export function parseFilterParams(input?: Record<string, string | string[] | undefined>): FilterParams {
  const getStr = (v: string | string[] | undefined, fallback = ''): string =>
    Array.isArray(v) ? (v[0] || fallback) : (v ?? fallback);

  const pageRaw = getStr(input?.page);
  const limitRaw = getStr(input?.limit);
  const sortRaw = getStr(input?.sort);
  const search = getStr(input?.search);
  const category = getStr(input?.category);
  const minPriceRaw = getStr(input?.minPrice);
  const maxPriceRaw = getStr(input?.maxPrice);

  const page = Math.max(1, parseInt(pageRaw) || 1);
  const limit = Math.max(1, parseInt(limitRaw) || 12);
  
  const sort: SortOrder = ['default', 'price_asc', 'price_desc'].includes(sortRaw) 
    ? sortRaw as SortOrder 
    : 'default';
  
  const parsePrice = (value: string): number | null => {
    const num = parseInt(value);
    return Number.isFinite(num) && num >= 0 ? num : null;
  };
  
  const minPrice = parsePrice(minPriceRaw);
  const maxPrice = parsePrice(maxPriceRaw);

  return { search, category, minPrice, maxPrice, sort, page, limit };
}

export function buildFilterQuery(params: Partial<FilterParams>): URLSearchParams {
  const searchParams = new URLSearchParams();
  
  if (params.search) searchParams.set('search', params.search);
  if (params.category) searchParams.set('category', params.category);
  if (params.minPrice !== null && params.minPrice !== undefined) 
    searchParams.set('minPrice', params.minPrice.toString());
  if (params.maxPrice !== null && params.maxPrice !== undefined) 
    searchParams.set('maxPrice', params.maxPrice.toString());
  if (params.sort && params.sort !== 'default') searchParams.set('sort', params.sort);
  if (params.page && params.page > 1) searchParams.set('page', params.page.toString());
  if (params.limit && params.limit !== 12) searchParams.set('limit', params.limit.toString());
  
  return searchParams;
}