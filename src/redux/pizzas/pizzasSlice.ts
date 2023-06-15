import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PizzaItem } from '../../interfaces';
import {
	PizzasRequestStatus,
	PizzasState,
	fetchPizzas,
} from './index';

const initialState: PizzasState = {
    pizzas: [],
    pizzasRequestStatus: PizzasRequestStatus.LOADING,
    requestError: '',
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzaData: (state, action: PayloadAction<PizzaItem[]>) => {
            state.pizzas = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.pizzasRequestStatus = PizzasRequestStatus.LOADING;
            state.pizzas = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.pizzasRequestStatus = PizzasRequestStatus.SUCCEEDED;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.pizzasRequestStatus = PizzasRequestStatus.ERROR;

            if (action.payload) {
                state.requestError = action.payload as unknown as string;
            } else {
                state.requestError = action.error.message as string;
            }

            state.pizzas = [];
        });
    },
});

export const { setPizzaData } = pizzasSlice.actions;

export default pizzasSlice.reducer;
