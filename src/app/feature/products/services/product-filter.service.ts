import { Injectable, signal } from '@angular/core';
import { Product } from '../models/interfaces/product';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

export interface FilterCriteria {
  selectedBrand: string;
  searchTerm: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  private searchSubject = new Subject<string>();
  private filterSubject = new Subject<FilterCriteria>();

  filteredProducts = signal<Product[]>([]);
  searchTerm = signal<string>('');
  selectedBrand = signal<string>('');

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm.set(searchTerm);
      this.applyFilters();
    });

    this.filterSubject.subscribe((criteria:FilterCriteria) => {
      this.selectedBrand.set(criteria.selectedBrand);
      this.searchTerm.set(criteria.searchTerm);
      this.applyFilters();
    });
  }

  setProducts(products: Product[]): void {
    this.allProducts = products;
    this.applyFilters();
  }

  private allProducts: Product[] = [];

  updateSearchTerm(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  updateFilterCriteria(criteria: FilterCriteria): void {
    this.filterSubject.next(criteria);
  }

  private applyFilters(): void {
    let filtered = [...this.allProducts];

    if (this.selectedBrand()) {
      filtered = filtered.filter(product =>
        product.brandName === this.selectedBrand()
      );
    }

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.brandName.toLowerCase().includes(term)
      );
    }

    this.filteredProducts.set(filtered);
  }

  resetFilters(): void {
    this.selectedBrand.set('');
    this.searchTerm.set('');
    this.filteredProducts.set([...this.allProducts]);
  }

  extractUniqueBrands(products: Product[]): string[] {
    return [...new Set(products.map((product: Product) => product.brandName))].sort();
  }
}
