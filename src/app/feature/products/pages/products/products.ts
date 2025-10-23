import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {Product} from '../../models/interfaces/product';
import {ProductFilter} from '../../components/product-filter/product-filter';
import {ProductList} from '../../components/product-list/product-list';
import {ProductSkeleton} from '../../components/product-skeleton/product-skeleton';
import {ProductService} from '../../services/product';
import {ProductResponse} from '../../models/interfaces/product-response';
import {ProductFilterService} from '../../services/product-filter.service';
import {Subject, takeUntil} from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  imports: [ProductFilter, ProductList, ProductSkeleton, MatPaginatorModule,MatProgressSpinnerModule],
  templateUrl: './products.html'
})
export class Products implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');

  currentPage = signal<number>(0);
  pageSize = signal<number>(5);
  totalPages = signal<number>(0);
  totalItems = signal<number>(0);

  get filteredProducts() { return this.productFilterService.filteredProducts; }
  get brands() {
    return signal(this.productFilterService.extractUniqueBrands(this.products()));
  }

  constructor(
    private _productService: ProductService,
    private productFilterService: ProductFilterService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProductList() {
    this.loading.set(true);
    this.error.set('');

    this._productService.getAllProducts(this.currentPage(), this.pageSize()).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res: ProductResponse) => {
        this.products.set(res.items || []);
        this.productFilterService.setProducts(res.items || []);
        this.totalPages.set(Math.ceil((res.total || 0) / this.pageSize()));
        this.totalItems.set(res.total || 0);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error.set('Failed to load products. Please try again.');
        this.loading.set(false);
      }
    });
  }

  onFilteredProductsChange(filterCriteria: { selectedBrand: string, searchTerm: string }) {
    this.productFilterService.updateFilterCriteria(filterCriteria);
  }

  handlePageEvent(e: PageEvent) {
      this.totalItems.set(e.length);
      this.pageSize.set(e.pageSize);
      this.currentPage.set(e.pageIndex);
      this.getProductList();

  }
}
