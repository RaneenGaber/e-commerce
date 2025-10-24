import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {LoadingInterceptor} from './core/interceptors/loading.interceptor';
import {provideStore} from '@ngrx/store';
import {CartEffects} from './store/cart/cart.effects';
import { provideEffects } from '@ngrx/effects';
import { cartReducer } from './store/cart/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      AuthInterceptor,
      ErrorInterceptor,
      LoadingInterceptor
    ])),
    provideStore({
      cart: cartReducer
    }),
    provideEffects(CartEffects),
  ]
};
