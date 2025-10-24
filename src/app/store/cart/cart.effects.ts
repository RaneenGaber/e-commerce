import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, catchError, tap, withLatestFrom, debounceTime, switchMap } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { selectCartItems } from './cart.selectors';
import {CartService} from '../../feature/cart/services/cart';
import {of} from 'rxjs';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private cartService = inject(CartService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      map(() => {
        const items = this.cartService.loadCartFromStorage();
        return CartActions.loadCartSuccess({ items });
      }),
      catchError((error) =>
        of(CartActions.loadCartFailure({ error: error.message }))
      )
    )
  );

  persistCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addToCart,
          CartActions.removeFromCart,
          CartActions.syncCart
        ),
        withLatestFrom(this.store.select(selectCartItems)),
        debounceTime(100), // Debounce to avoid excessive localStorage writes
        tap(([action, items]) => {
          this.cartService.saveCartToStorage(items);
        })
      ),
    { dispatch: false }
  );

  clearCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.clearCart),
        tap(() => {
          this.cartService.clearCart();
        })
      ),
    { dispatch: false }
  );


  syncCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.syncCart),
        tap(({ items }) => {
          this.cartService.syncCartFromStorage(items);
        })
      ),
    { dispatch: false }
  );
}
