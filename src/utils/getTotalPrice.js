export const getTotalCartPizzasPrice = (cartItems) => {
    return cartItems.reduce((totalPrice, pizza) => pizza.price * pizza.quantity + totalPrice, 0);
};
