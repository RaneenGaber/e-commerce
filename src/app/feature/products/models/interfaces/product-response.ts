import {Product} from './product';

export interface ProductResponse extends Product {
  recommendedProducts:Product[]
}
