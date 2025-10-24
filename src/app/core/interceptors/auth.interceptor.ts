import {inject} from '@angular/core';
import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
 let authService = inject(AuthService)
  const token: string | null= authService.getToken();

  if (token) {
    const newReq  = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }

  return next(req);
}
