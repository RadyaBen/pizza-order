import { getTotalCartPizzasPrice } from './getTotalPrice';
import { CartItem } from '../interfaces';

export const getCartFromLocalStorage = () => {
    const localCart = localStorage.getItem('cart');
    const localCartItems = localCart ? JSON.parse(localCart) : [];
    const cartTotalPrice = getTotalCartPizzasPrice(localCartItems);

    return {
        cartItems: localCartItems as CartItem[],
        cartTotalPrice,
    };
};
