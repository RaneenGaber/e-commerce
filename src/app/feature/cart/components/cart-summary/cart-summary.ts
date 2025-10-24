import { Component, inject } from '@angular/core';
import {AsyncPipe, CommonModule, DecimalPipe} from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartItemsCount, selectCartTotal } from '../../../../store/cart/cart.selectors';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {CartService} from '../../services/cart';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, MatButtonModule,AsyncPipe,DecimalPipe],
  templateUrl:'cart-summary.html',
  styles: []
})
export class CartSummary {
  private _cartService  = inject(CartService);
  private router = inject(Router);
  private store  = inject(Store);

  // Selectors
  cartItemsCount$ = this.store.select(selectCartItemsCount);
  cartTotal$ = this.store.select(selectCartTotal);


  clearCart(): void {
    this._cartService.clearCart();
  }

  proceedToCheckout(): void {
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
