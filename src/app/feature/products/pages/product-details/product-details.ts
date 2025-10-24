import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {Product} from '../../models/interfaces/product';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product';
import {ProductResponse} from '../../models/interfaces/product-response';
import {Header} from '../../../../shared/components/header/header';
import {ProductSkeleton} from '../../components/product-skeleton/product-skeleton';
import {ProductList} from '../../components/product-list/product-list';

@Component({
  selector: 'app-product-details',
  imports: [Header,ProductSkeleton,ProductList],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  product = signal<any>({});
  recommendedProducts = signal<Product[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');

  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.getProductById(productId)
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProductById(productId:string) {
    this.loading.set(true);
    this.error.set('');

    this._productService.getProductById(productId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res:ProductResponse) => {
        const { recommendedProducts, ...product } = res;
        this.product.set(product || {});
        this.recommendedProducts.set(recommendedProducts)
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products. Please try again.');
        this.loading.set(false);
      }
    });
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: Product): void {
  }

  removeFromCart(product: Product): void {
    if (product) {
    }
  }

}
