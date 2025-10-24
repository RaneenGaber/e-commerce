import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  selectCartItems,
  (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  selectCartTotal,
  (total) => total
);

export const selectCartTax = createSelector(
  selectCartTotal,
  (total) => total * 0.1 // 10% tax
);

export const selectCartGrandTotal = createSelector(
  selectCartTotal,
  selectCartTax,
  (subtotal, tax) => subtotal + tax
);

export const selectIsProductInCart = (productId: string) =>
  createSelector(selectCartItems, (items) =>
    items.some((item) => item.id === productId)
  );


export const selectCartSummary = createSelector(
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
  selectCartTax,
  selectCartGrandTotal,
  (items, totalItems, subtotal, tax, total) => ({
    items,
    totalItems,
    subtotal,
    tax,
    shipping: 0,
    total,
  })
);
