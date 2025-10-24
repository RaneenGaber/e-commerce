import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () => import('./feature/auth/auth.routes'),
    title: 'Login - E-Commerce App',
  },

  {
    path: 'products',
    loadChildren: () => import('./feature/products/product.routes'),
    canActivate: [AuthGuard],
    title: 'Products - E-Commerce App',
  },


  // Wildcard route - 404 Not Found
  {
    path: '**',
    redirectTo: '',
  },
];
