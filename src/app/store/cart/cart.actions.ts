import { createAction, props } from '@ngrx/store';
import {Product} from '../../feature/products/models/interfaces/product';

export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: Product[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product; quantity?: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ id: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const syncCart = createAction(
  '[Cart] Sync Cart',
  props<{ items: Product[] }>()
);
