import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {LoginResponse} from '../../models/interfaces/login-response';
import {LoginCredentials} from '../../models/interfaces/login-credentials';
import {environment} from '../../../../../environments/environment';
import {ErrorHandle} from '../utils/error-handle';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  public isAuthenticated = signal<boolean>(this.hasValidToken());

  constructor(private http: HttpClient,
              private errorHandle:ErrorHandle) {
    this.checkAuthStatus();
  }


  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response:LoginResponse) => this.handleLoginSuccess(response)),
        catchError(error => this.errorHandle.handleError(error, 'login'))
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

}
