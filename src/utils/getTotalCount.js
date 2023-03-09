export const getTotalCartPizzasCount = (cartItems) => {
    return cartItems.reduce((totalCount, pizza) => totalCount + pizza.quantity, 0);
};
