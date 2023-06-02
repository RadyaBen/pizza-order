import { CartItem } from '../interfaces';

export const getTotalCartPizzasCount = (cartItems: CartItem[]) => {
    return cartItems.reduce((totalCount, pizza) => totalCount + pizza.quantity, 0);
};
