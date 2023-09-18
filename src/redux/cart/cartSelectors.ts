import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItem = (
		id: string,
		size: number,
		type: string,
) => (state: RootState) =>
		state.cart.cartItems.find(
			(pizza) =>
				pizza.id === id &&
				pizza.size === size &&
				pizza.type === type,
		);
