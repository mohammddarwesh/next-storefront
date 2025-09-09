import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import {
  calculateTotalPrice,
  calculateTotalQuantity,
  findCartItem,
  formatCartItem,
  removeItemFromCart,
  updateItemQuantity as updateItemQuantityUtil,
} from './cartUtils';
import type {
  CartState,
  AddToCartPayload,
  UpdateQuantityPayload,
} from '@/lib/types/cart';

const initialState: CartState = {
  items: [],
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddToCartPayload>) => {
      const existingItem = findCartItem(state.items, action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(formatCartItem(action.payload));
      }
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = removeItemFromCart(state.items, action.payload);
    },
    
    updateItemQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { id, quantity } = action.payload;
      state.items = updateItemQuantityUtil(state.items, id, quantity);
    },
    
    clearCart: (state) => {
      state.items = [];
    },
    
    openCartDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    
    closeCartDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectIsCartOpen = (state: RootState) => state.cart.isDrawerOpen;

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => calculateTotalQuantity(items)
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => calculateTotalPrice(items)
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

export const selectIsInCart = (id: string) => 
  createSelector(
    [selectCartItems],
    (items) => items.some(item => item.id === id)
  );

// Export actions
export const {
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  openCartDrawer,
  closeCartDrawer,
} = cartSlice.actions;

// Export the reducer as default
export default cartSlice.reducer;
