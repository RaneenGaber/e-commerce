import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ProductsResponse } from '../models/interfaces/products-response';
import {ProductResponse} from '../models/interfaces/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient) {}

  /**
   * Get all products with pagination
   * @param page - Page number (0-based)
   * @param size - Number of items per page
   * @returns Observable of ProductResponse
   */
  getAllProducts(page: number = 0, size: number = 10): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ProductsResponse>(this.baseUrl, { params })
  }

  /**
   * Get a single product by ID
   * @param id - Product ID
   * @returns Observable of Product
   */
  getProductById(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`)
  }

  /**
   * Search products by name or description
   * @param query - Search query
   * @param page - Page number (0-based)
   * @param size - Number of items per page
   * @returns Observable of ProductResponse
   */
  searchProducts(query: string, page: number = 0, size: number = 10): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('search', query)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ProductsResponse>(`${this.baseUrl}/search`, { params })
  }
}
