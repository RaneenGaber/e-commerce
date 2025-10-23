import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ProductResponse } from '../models/interfaces/product-response';
import { Product } from '../models/interfaces/product';
import { ErrorHandle } from '../../../core/services/utils/error-handle';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly baseUrl = `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient,
    private errorHandle: ErrorHandle
  ) {}

  /**
   * Get all products with pagination
   * @param page - Page number (0-based)
   * @param size - Number of items per page
   * @returns Observable of ProductResponse
   */
  getAllProducts(page: number = 0, size: number = 10): Observable<ProductResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ProductResponse>(this.baseUrl, { params }).pipe(
      catchError(error => this.errorHandle.handleError(error, 'products'))
    );
  }

  /**
   * Get a single product by ID
   * @param id - Product ID
   * @returns Observable of Product
   */
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => this.errorHandle.handleError(error, 'products'))
    );
  }

  /**
   * Search products by name or description
   * @param query - Search query
   * @param page - Page number (0-based)
   * @param size - Number of items per page
   * @returns Observable of ProductResponse
   */
  searchProducts(query: string, page: number = 0, size: number = 10): Observable<ProductResponse> {
    const params = new HttpParams()
      .set('search', query)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ProductResponse>(`${this.baseUrl}/search`, { params }).pipe(
      catchError(error => this.errorHandle.handleError(error, 'products'))
    );
  }
}
