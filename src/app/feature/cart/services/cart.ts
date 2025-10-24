import { Injectable, inject } from '@angular/core';
import {Product} from '../../products/models/interfaces/product';
import { Store } from '@ngrx/store';
import * as CartActions from '../../../store/cart/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shopping_cart';
  private store = inject(Store);

  constructor() {}

  /**
   * Clear entire Local Storage
   */
  clearFromStorage(): void {
    localStorage.removeItem(this.CART_STORAGE_KEY);
  }
  /**
   * Clear entire cart
   */
  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  /**
   * Add To cart
   */
  addToCart(product:Product): void {
    this.store.dispatch(CartActions.addToCart({product}));
  }

  /**
   * Remove From cart
   */
  removeFromCart(product:Product): void {
    this.store.dispatch(CartActions.removeFromCart({ id: product.id }));
  }

  /**
   * Public: Sync cart from storage
   */

  syncCartFromStorage(items: Product[]): void {
    this.store.dispatch(CartActions.syncCart({ items }));
  }

  /**
   * Public: Save cart to localStorage
   */
  saveCartToStorage(cart: Product[]): void {
    try {
      const cartData = JSON.stringify(cart);
      localStorage.setItem(this.CART_STORAGE_KEY, cartData);
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  /**
   * Public: Load cart from localStorage
   */
  loadCartFromStorage(): Product[] {
    try {
      const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        // Validate cart data structure
        if (Array.isArray(parsedCart)) {
          return parsedCart.filter(this.isValidCartItem);
        }
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
    return [];
  }

  /**
   * Private: Validate cart item structure
   */
  private isValidCartItem(item: any): boolean {
    return (
      item &&
      typeof item === 'object' &&
      item &&
      typeof item.id === 'string' &&
      typeof item.productName === 'string' &&
      typeof item.price === 'number' &&
      typeof item.quantity === 'number' &&
      item.quantity > 0
    );
  }

}
