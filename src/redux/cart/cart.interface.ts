import { CartItem } from '../../interfaces';

export interface CartState {
    cartItems: CartItem[];
    cartTotalPrice: number;
}
