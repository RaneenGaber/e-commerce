import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth/auth';
import {inject} from '@angular/core';
import {RoutePath} from '../models/enums/route-path';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate([`/${RoutePath.LOGIN}`]);
  return false;
};
