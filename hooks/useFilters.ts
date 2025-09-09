'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/lib/store';
import {
  setSearch as setSearchAction,
  setCategory as setCategoryAction,
  setMinPrice as setMinPriceAction,
  setMaxPrice as setMaxPriceAction,
  setSort as setSortAction,
  resetFilters as resetFiltersAction,
  type SortOrder,
} from '@/lib/features/filters/filtersSlice';
import { useCallback } from 'react';

export const useFilters = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const search = useSelector((s: RootState) => s.filters.search);
  const category = useSelector((s: RootState) => s.filters.category);
  const minPrice = useSelector((s: RootState) => s.filters.minPrice);
  const maxPrice = useSelector((s: RootState) => s.filters.maxPrice);
  const sort = useSelector((s: RootState) => s.filters.sort);

  // Actions
  const setSearch = useCallback((value: string) => {
    dispatch(setSearchAction(value));
  }, [dispatch]);

  const setCategory = useCallback((value: string) => {
    dispatch(setCategoryAction(value));
  }, [dispatch]);

  const setMinPrice = useCallback((value: number | null) => {
    dispatch(setMinPriceAction(value));
  }, [dispatch]);

  const setMaxPrice = useCallback((value: number | null) => {
    dispatch(setMaxPriceAction(value));
  }, [dispatch]);

  const setSort = useCallback((value: SortOrder) => {
    dispatch(setSortAction(value));
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(resetFiltersAction());
  }, [dispatch]);

  return {
    // State
    search, category, minPrice, maxPrice, sort,
    // Actions
    setSearch, setCategory, setMinPrice, setMaxPrice, setSort, resetFilters,
  } as const;
};

export default useFilters;
