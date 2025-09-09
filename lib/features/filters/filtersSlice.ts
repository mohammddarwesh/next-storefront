import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortOrder = 'default' | 'price_asc' | 'price_desc';

export interface FiltersState {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortOrder;
}

const initialState: FiltersState = {
  search: '',
  category: '',
  minPrice: null,
  maxPrice: null,
  sort: 'default',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number | null>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number | null>) {
      state.maxPrice = action.payload;
    },
    setSort(state, action: PayloadAction<SortOrder>) {
      state.sort = action.payload;
    },
    resetFilters() {
      return initialState;
    },
    setFromQuery(
      state,
      action: PayloadAction<Partial<{ search: string; category: string; minPrice: number | null; maxPrice: number | null; sort: SortOrder }>>
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSearch, setCategory, setMinPrice, setMaxPrice, setSort, resetFilters, setFromQuery } = filtersSlice.actions;

export default filtersSlice.reducer;
