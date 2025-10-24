import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';

export function LoadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);


  // Start loading
  loadingService.startLoading();

  return next(req).pipe(
    finalize(() => {
      // Stop loading when request completes (success or error)
      loadingService.stopLoading();
    })
  );
}
