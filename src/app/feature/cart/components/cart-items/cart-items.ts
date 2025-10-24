import {Component, input} from '@angular/core';
import {Product} from '../../../products/models/interfaces/product';
import {Table} from '../../../../shared/components/table/table';
import {CartCols} from '../../cart.config';

@Component({
  selector: 'app-cart-items',
  imports: [Table],
  templateUrl: './cart-items.html',
  styleUrl: './cart-items.css',
})
export class CartItems {
  items = input<Product[]>([]);
  cartCols = CartCols;
}
