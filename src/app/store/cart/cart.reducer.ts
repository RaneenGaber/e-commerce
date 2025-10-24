import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { initialCartState } from './cart.state';
import {Product} from '../../feature/products/models/interfaces/product';

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.loadCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null,
  })),

  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CartActions.addToCart, (state, { product, quantity = 1 }) => {
    const existingItemIndex = state.items.findIndex(
      (item:Product) => item.id === product.id
    );

    let updatedItems: Product[];

    if (existingItemIndex !== -1) {
      // Product exists, update quantity
      updatedItems = state.items.map((item:Product, index:number) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // New product, add to cart
      const newItem: Product = {...product,quantity};
      updatedItems = [...state.items, newItem];
    }

    return {
      ...state,
      items: updatedItems,
    };
  }),

  on(CartActions.removeFromCart, (state, { id }) => ({
    ...state,
    items: state.items.filter((item:Product) => item.id !== id),
  })),

  on(CartActions.syncCart, (state, { items }) => ({
    ...state,
    items,
  }))
);
