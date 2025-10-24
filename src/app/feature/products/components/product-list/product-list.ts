import {Component, input} from '@angular/core';
import {Product} from '../../models/interfaces/product';
import {ProductCard} from '../product-card/product-card';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html'
})
export class ProductList {
  products = input<Product[]>([]);


}
