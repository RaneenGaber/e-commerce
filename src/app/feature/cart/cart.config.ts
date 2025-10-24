import {signal} from '@angular/core';
import {TableColumn} from '../../shared/models/table-column';
import {Product} from '../products/models/interfaces/product';

export const CartCols = signal<TableColumn[]>([
  {
    columnDef: 'imageUrl',
    header: 'Product Name',
    cell: (product: Product): string => `${product.imageUrl ? `<img
        src="${product.imageUrl}"
        alt="${product.productName}"
        class="sm:w-30 bg-cover bg-center h-20 w-full rounded-lg"/>` : ''}`
  },
  {
    columnDef: 'productName',
    header: '',
    cell: (product: Product): string => `${product.productName ? product.productName : ''}`
  },
  {
    columnDef: 'price',
    header: 'Price',
    cell: (product: Product): string => `${product.price ? product.price + '$' : 0}`
  }, {
    columnDef: 'quantity',
    header: 'Qty',
    cell: (product: Product): string => `${product.quantity ? product.quantity : 0}`
  }, {
    columnDef: 'total',
    header: 'Total',
    cell: (product: Product): string => `${(product.price && product.quantity) ? product.price * product.quantity : 0}`
  }
])
