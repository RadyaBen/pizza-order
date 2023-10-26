import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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

const findPizzaInCart = (state: CartState, action: PayloadAction<CartItem>) => {
	const { id, size, type } = action.payload;

    return state.cartItems.find(
		(pizza) =>
			pizza.id === id &&
			pizza.size === size &&
			pizza.type === type,
	);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaToCart: (state, action: PayloadAction<CartItem>) => {
            const pizzaInCart = findPizzaInCart(state, action);

            if (pizzaInCart) {
                pizzaInCart.quantity++;
				toast.info(`${pizzaInCart.title} quantity is increased`);
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                });
				toast.success(`${action.payload.title} is added to the cart`);
            }

            state.cartTotalPrice = getTotalCartPizzasPrice(state.cartItems);
        },
        removePizzaFromCart: (state, action: PayloadAction<CartItem>) => {
			const pizzaInCart = findPizzaInCart(state, action);

            state.cartItems = state.cartItems.filter(
				(item) => item !== pizzaInCart,
				toast.warn(`${pizzaInCart?.title} is deleted from the cart`),
			);

            state.cartTotalPrice = getTotalCartPizzasPrice(state.cartItems);
        },
        decreaseCartQuantity: (state, action: PayloadAction<CartItem>) => {
            const pizzaInCart = findPizzaInCart(state, action);

            if (pizzaInCart) {
                if (pizzaInCart.quantity === 1) {
                    cartSlice.caseReducers.removePizzaFromCart(state, action);
                } else {
                    pizzaInCart.quantity--;
					toast.warn(`${pizzaInCart.title} quantity is decreased`);
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
