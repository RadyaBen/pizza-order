export const selectCart = (state) => state.cart;

export const selectCartItemById = (id) => (state) =>
    state.cart.cartItems.find((pizza) => pizza.id === id);
