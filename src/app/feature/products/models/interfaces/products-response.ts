import {Product} from './product';

export interface ProductsResponse {
  page: number,
  size: number,
  total: number,
  items: Product[]
}
