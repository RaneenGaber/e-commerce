import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandle {

  constructor(private router: Router) {}

  /**
   * Handle HTTP errors with customizable context
   * @param error - HTTP error response
   * @param context - Context for error messages (e.g., 'login', 'products')
   * @returns Observable that throws an error
   */
  handleError(error: HttpErrorResponse, context: string = 'operation'): Observable<never> {
    let errorMessage = `An error occurred during ${context}`;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = this.getBadRequestMessage(context);
          break;
        case 401:
          errorMessage = this.getUnauthorizedMessage(context);
          this.router.navigate([`/login`]);
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 404:
          errorMessage = this.getNotFoundMessage(context);
          break;
        case 500:
          errorMessage = 'Server error. Please try again later';
          break;
        case 0:
          errorMessage = 'Network error. Please check your connection';
          break;
        default:
          errorMessage = error.error?.message || this.getDefaultMessage(context);
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get context-specific bad request message
   */
  private getBadRequestMessage(context: string): string {
    switch (context) {
      case 'login':
        return 'Invalid username or password';
      case 'products':
        return 'Invalid request parameters';
      case 'user':
        return 'Invalid user data';
      default:
        return 'Invalid request';
    }
  }

  /**
   * Get context-specific unauthorized message
   */
  private getUnauthorizedMessage(context: string): string {
    switch (context) {
      case 'login':
        return 'Invalid username or password';
      case 'products':
        return 'Unauthorized access';
      default:
        return 'Unauthorized access';
    }
  }

  /**
   * Get context-specific not found message
   */
  private getNotFoundMessage(context: string): string {
    switch (context) {
      case 'login':
        return 'Login service not found';
      case 'products':
        return 'Products not found';
      default:
        return 'Resource not found';
    }
  }

  /**
   * Get context-specific default message
   */
  private getDefaultMessage(context: string): string {
    switch (context) {
      case 'login':
        return 'Login failed. Please try again';
      case 'products':
        return 'Failed to fetch products. Please try again';
      default:
        return 'Operation failed. Please try again';
    }
  }
}
