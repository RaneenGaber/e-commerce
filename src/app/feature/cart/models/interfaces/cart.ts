import {Product} from '../../../products/models/interfaces/product';

export interface Cart {
  items: Product[];
  totalItems: number;
  totalPrice: number;
}
