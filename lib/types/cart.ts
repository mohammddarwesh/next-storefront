/**
 * Represents an item in the shopping cart
 */
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

/**
 * The state of the shopping cart
 */
export interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

/**
 * Payload for adding an item to the cart
 */
export type AddToCartPayload = Omit<CartItem, 'quantity'>;

/**
 * Payload for updating the quantity of a cart item
 */
export interface UpdateQuantityPayload {
  /** The ID of the cart item to update */
  id: string;
  /** The new quantity for the item (must be >= 1) */
  quantity: number;
}

/**
 * Collection of selector functions for the cart state
 */
export interface CartSelectors {
  selectCartItems: (state: { cart: CartState }) => CartItem[];
  selectIsCartOpen: (state: { cart: CartState }) => boolean;
  selectCartTotalQuantity: (state: { cart: CartState }) => number;
  selectCartTotalPrice: (state: { cart: CartState }) => number;
  selectCartItemCount: (state: { cart: CartState }) => number;
  selectIsInCart: (id: string) => (state: { cart: CartState }) => boolean;
};
