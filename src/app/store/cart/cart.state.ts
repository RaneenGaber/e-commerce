import {Product} from '../../feature/products/models/interfaces/product';

export interface CartState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  loading: false,
  error: null,
};
