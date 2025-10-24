import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartItemsCount } from '../../../store/cart/cart.selectors';
import { Router } from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {RoutePath} from '../../../core/models/enums/route-path';

@Component({
  selector: 'app-go-to-cart',
  imports: [MatIcon,AsyncPipe],
  templateUrl: './go-to-cart.html',
  styleUrl: './go-to-cart.css',
})
export class GoToCart {
  cartItemsCount$: Observable<number>;

  constructor(
    public router: Router,
    private store: Store,

  ) {
    this.cartItemsCount$ = this.store.select(selectCartItemsCount);
  }

  navigateToCart() {
    this.router.navigate([`/${RoutePath.CART}`]);

  }

}
