import {Component, input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconModule} from '@angular/material/icon';
import {DecimalPipe} from '@angular/common';
import { Product } from '../../models/interfaces/product';
@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule,MatCardModule,MatIcon,MatIconModule,DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input<Product>({
    id: '',
    productName: '',
    description: '',
    quantity: 0,
    imageUrl: '',
    price: 0,
    brandName: ''
  });
}
