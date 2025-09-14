'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterParams } from '@/lib/types/filters';
import { parseFilterParams, buildFilterQuery } from '@/lib/features/filters/urlParams';
import { toUrl } from '@/lib/utils/searchParams';

export const useFilterState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = useMemo(() => {
    return parseFilterParams(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  const updateParams = useCallback((updates: Partial<FilterParams>) => {
    const current = parseFilterParams(Object.fromEntries(searchParams.entries()));
    const merged = { ...current, ...updates };
    
    if (Object.keys(updates).some(key => !['page', 'limit'].includes(key))) {
      merged.page = 1;
    }
    
    const newSearchParams = buildFilterQuery(merged);
    router.replace(toUrl(pathname, newSearchParams), { scroll: false });
  }, [router, pathname, searchParams]);

  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (currentParams.search) count++;
    if (currentParams.category) count++;
    if (currentParams.minPrice !== null) count++;
    if (currentParams.maxPrice !== null) count++;
    if (currentParams.sort !== 'default') count++;
    return count;
  }, [currentParams]);

  return {
    currentParams,
    updateParams,
    resetFilters,
    activeFilterCount,
  };
};