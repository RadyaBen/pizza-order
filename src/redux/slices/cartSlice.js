import { createSlice } from '@reduxjs/toolkit';

import { getTotalCartPizzasPrice } from '../../utils/getTotalPrice';

const initialState = {
    cartItems: [],
    cartTotalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaToCart: (state, action) => {
            const { id } = action.payload;
            const pizzaInCart = state.cartItems.find((pizza) => pizza.id === id);

            if (pizzaInCart) {
                pizzaInCart.quantity++;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                });
            }

            state.cartTotalPrice = getTotalCartPizzasPrice(state.cartItems);
        },
        removePizzaFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            state.cartTotalPrice = getTotalCartPizzasPrice(state.cartItems);
        },
        decreaseCartQuantity: (state, action) => {
            const pizzaInCart = state.cartItems.find((pizza) => pizza.id === action.payload);

            if (pizzaInCart) {
                pizzaInCart.quantity--;
            }

            state.cartTotalPrice = getTotalCartPizzasPrice(state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.cartTotalPrice = 0;
        },
    },
});

export const {
	addPizzaToCart,
	removePizzaFromCart,
	decreaseCartQuantity,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
