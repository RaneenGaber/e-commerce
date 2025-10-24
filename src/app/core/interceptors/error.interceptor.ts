import { inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RoutePath} from '../models/enums/route-path';

export function ErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorTitle = 'Error';
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
        console.error('Client Error:', error.error);
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorTitle = 'Bad Request';
            errorMessage = 'Please check your input and try again';
            break;
          case 401:
            errorTitle = 'Unauthorized';
            errorMessage = 'Please login again to continue';
            // Redirect to login page
            router.navigate([`/${RoutePath.LOGIN}`]);
            break;
          case 403:
            errorTitle = 'Access Denied';
            errorMessage = 'You do not have permission to access this resource';
            break;
          case 404:
            errorTitle = 'Not Found';
            errorMessage = 'The requested resource was not found';
            break;
          case 422:
            errorTitle = 'Validation Error';
            errorMessage = 'Please check your input and try again';
            break;
          case 429:
            errorTitle = 'Too Many Requests';
            errorMessage = 'Please try again later';
            break;
          case 500:
            errorTitle = 'Server Error';
            errorMessage = 'Internal server error. Please try again later';
            break;
          case 502:
            errorTitle = 'Bad Gateway';
            errorMessage = 'Server is temporarily unavailable';
            break;
          case 503:
            errorTitle = 'Service Unavailable';
            errorMessage = 'Service is temporarily unavailable. Please try again later';
            break;
          case 504:
            errorTitle = 'Timeout';
            errorMessage = 'Request timed out. Please try again';
            break;
          default:
            errorTitle = 'Server Error';
            errorMessage = `Server Error: ${error.status} - ${error.statusText}`;
        }
      }

      snackBar.open(errorTitle, 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-error',
        });

      return throwError(() => error);
    })
  );
}
