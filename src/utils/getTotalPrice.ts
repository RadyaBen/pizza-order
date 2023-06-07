import { CartItem } from '../interfaces';

export const getTotalCartPizzasPrice = (cartItems: CartItem[]) => {
    return cartItems.reduce((totalPrice, pizza) => pizza.price * pizza.quantity + totalPrice, 0);
};
