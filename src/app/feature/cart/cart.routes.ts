import {Routes} from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./pages/cart/cart').then(
        (c) => c.Cart
      ),
  }
] as Routes;
