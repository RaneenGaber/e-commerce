import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {Product} from '../../models/interfaces/product';
import {Observable, Subject, takeUntil} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product';
import {ProductResponse} from '../../models/interfaces/product-response';
import {Header} from '../../../../shared/components/header/header';
import {ProductSkeleton} from '../../components/product-skeleton/product-skeleton';
import {ProductList} from '../../components/product-list/product-list';
import {FormsModule} from '@angular/forms';
import {selectIsProductInCart} from '../../../../store/cart/cart.selectors';
import {AsyncPipe} from '@angular/common';
import {GoToCart} from '../../../../shared/components/go-to-cart/go-to-cart';
import {CartService} from '../../../cart/services/cart';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-product-details',
  imports: [GoToCart, Header, ProductSkeleton, ProductList, FormsModule, AsyncPipe],
  templateUrl: './product-details.html'
})
export class ProductDetails implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isProductInCart$!: Observable<boolean>;

  product = signal<any>({});
  recommendedProducts = signal<Product[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');

  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService,
    private _cartService: CartService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.getProductById(productId);
        this.isProductInCart$ = this.store.select(selectIsProductInCart(productId));
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
    if (product) {
      for (let i = 0; i < this.quantity; i++) {
        this._cartService.addToCart(product);
      }
      this.quantity = 1;
    }
  }

  removeFromCart(product: Product): void {
    if (product) {
      this._cartService.removeFromCart(product);
    }
  }

}
