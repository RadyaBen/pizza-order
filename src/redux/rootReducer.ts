import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import pizzasReducer from './pizzas/pizzasSlice';
import filterReducer from './filter/filterSlice';
import cartReducer from './cart/cartSlice';

const persistConfig = {
    key: 'cart',
    storage,
    whitelist: ['cart'],
};

export const rootReducer = combineReducers({
    pizzas: pizzasReducer,
    filter: filterReducer,
    cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
