import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {LoginResponse} from '../../models/interfaces/login-response';
import {LoginCredentials} from '../../models/interfaces/login-credentials';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly TOKEN_KEY = 'auth_token';
  public isAuthenticated = signal<boolean>(this.hasValidToken());

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }


  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response:LoginResponse) => this.handleLoginSuccess(response)),
        catchError(error => this.handleError(error))
      );
  }


  logout(): void {
    this.clearAuthData();
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated();
  }

  private handleLoginSuccess(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    this.isAuthenticated.set(true);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    return !!token;
  }


  private checkAuthStatus(): void {
    const isAuth = this.hasValidToken();
    this.isAuthenticated.set(isAuth);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred during login';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid username or password';
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 404:
          errorMessage = 'Login service not found';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later';
          break;
        case 0:
          errorMessage = 'Network error. Please check your connection';
          break;
        default:
          errorMessage = error.error?.message || 'Login failed. Please try again';
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
