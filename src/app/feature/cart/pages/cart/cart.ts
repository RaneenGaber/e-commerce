import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItems} from '../../components/cart-items/cart-items';
import {Observable, Subject} from 'rxjs';
import {Product} from '../../../products/models/interfaces/product';
import {Header} from '../../../../shared/components/header/header';
import {selectCartItems, selectCartItemsCount, selectCartTotal} from '../../../../store/cart/cart.selectors';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {CartSummary} from '../../components/cart-summary/cart-summary';
@Component({
  selector: 'app-cart',
  imports: [CartItems, CartSummary, Header, AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit, OnDestroy {
  cartItems$: Observable<Product[]>;
  cartItemsCount$: Observable<number>;
  cartTotal$: Observable<number>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartItemsCount$ = this.store.select(selectCartItemsCount);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Continue shopping - navigate to products
   */
  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
