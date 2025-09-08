import type { CartItem } from '@/lib/types/cart';

export const calculateTotalQuantity = (items: CartItem[]): number => 
  items.reduce((total, item) => total + item.quantity, 0);

export const calculateTotalPrice = (items: CartItem[]): number =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export const findCartItem = (items: CartItem[], id: string): CartItem | undefined =>
  items.find(item => item.id === id);

export const formatCartItem = (item: Omit<CartItem, 'quantity'>): CartItem => ({
  ...item,
  quantity: 1,
});

export const updateItemQuantity = (
  items: CartItem[], 
  id: string, 
  quantity: number
): CartItem[] => 
  items.map(item => 
    item.id === id 
      ? { ...item, quantity: Math.max(1, quantity) } 
      : item
  );

export const removeItemFromCart = (items: CartItem[], id: string): CartItem[] =>
  items.filter(item => item.id !== id);
