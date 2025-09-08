'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import {
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  openCartDrawer,
  closeCartDrawer,
  selectCartItems,
  selectIsCartOpen,
  selectCartTotalQuantity,
  selectCartTotalPrice,
  selectCartItemCount,
  selectIsInCart,
} from '@/lib/features/cart/cartSlice';
import type { CartItem, AddToCartPayload } from '@/lib/types/cart';
import { useCallback } from 'react';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Selectors
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);
  const itemCount = useSelector(selectCartItemCount);

  // Actions
  const addToCart = useCallback((item: AddToCartPayload) => {
    dispatch(addItem(item));
  }, [dispatch]);

  const removeFromCart = useCallback((id: string) => {
    dispatch(removeItem(id));
  }, [dispatch]);

  const updateCartItemQuantity = useCallback((id: string, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  }, [dispatch]);

  const clearCartItems = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const isInCart = useCallback((id: string) => {
    return selectIsInCart(id)({ cart: { items } } as RootState);
  }, [items]);

  return {
    // State
    items,
    totalQuantity,
    totalPrice,
    itemCount,
    
    // Actions
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
clearCart: clearCartItems,
    isInCart,
  };
};

export default useCart;
