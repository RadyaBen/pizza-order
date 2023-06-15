import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
	getTotalCartPizzasPrice,
	getCartFromLocalStorage,
} from '../../utils';
import { CartItem } from '../../interfaces';
import { CartState } from './index';

const { cartItems, cartTotalPrice } = getCartFromLocalStorage();

const initialState: CartState = {
    cartItems,
    cartTotalPrice,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaToCart: (state, action: PayloadAction<CartItem>) => {
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
        removePizzaFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            state.cartTotalPrice = getTotalCartPizzasPrice(state.cartItems);
        },
        decreaseCartQuantity: (state, action: PayloadAction<string>) => {
            const pizzaInCart = state.cartItems.find((pizza) => pizza.id === action.payload);

            if (pizzaInCart) {
                if (pizzaInCart.quantity === 1) {
                    state.cartItems = state.cartItems.filter((item) => item.quantity > 0);
                } else {
                    pizzaInCart.quantity--;
                }
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
