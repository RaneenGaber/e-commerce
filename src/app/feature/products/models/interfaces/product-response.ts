import {Product} from './product';

export interface ProductResponse {
  page: number,
  size: number,
  total: number,
  items: Product[]
}
