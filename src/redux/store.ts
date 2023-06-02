import { configureStore } from '@reduxjs/toolkit';

import pizzasReducer from './pizzas/pizzasSlice';
import filterReducer from './filter/filterSlice';
import cartReducer from './cart/cartSlice';

export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        filter: filterReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
