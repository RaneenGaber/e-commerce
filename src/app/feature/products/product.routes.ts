import {Routes} from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./pages/products/products').then(
        (c) => c.Products
      ),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/product-details/product-details').then((c) => c.ProductDetails),
  }
] as Routes;
