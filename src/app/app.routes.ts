import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {RoutePath} from './core/models/enums/route-path';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${RoutePath.PRODUCT}`,
    pathMatch: 'full',
  },

  {
    path: RoutePath.LOGIN,
    loadChildren: () => import('./feature/auth/auth.routes'),
    title: 'Login - E-Commerce App',
  },

  {
    path: RoutePath.PRODUCT,
    loadChildren: () => import('./feature/products/product.routes'),
    canActivate: [AuthGuard],
    title: 'Products - E-Commerce App',
  },

  {
    path: RoutePath.CART,
    loadChildren: () => import('./feature/cart/cart.routes'),
    canActivate: [AuthGuard],
    title: 'Cart - E-Commerce App',
  },


  // Wildcard route - 404 Not Found
  {
    path: '**',
    redirectTo: '',
  },
];
