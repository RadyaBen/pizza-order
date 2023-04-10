import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (params, { rejectWithValue, signal }) => {
        const { category, sortBy, order, search, currentPage } = params;

        const API_ENDPOINT = process.env.REACT_APP_PIZZAS_API_ENDPOINT;

        try {
            const { data } = await axios.get(
                API_ENDPOINT +
                    `?page=${currentPage}&limit=4&
					${category}
					&sortBy=${sortBy}
					&order=${order}
					${search}`,
                { signal },
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const initialState = {
    pizzas: [],
    pizzasRequestStatus: 'loading',
    requestError: '',
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzaData: (state, action) => {
            state.pizzas = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.pizzasRequestStatus = 'loading';
            state.pizzas = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.pizzasRequestStatus = 'succeeded';
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.pizzasRequestStatus = 'error';
            state.requestError = action.payload;
            state.pizzas = [];
        });
    },
});

export const { setPizzaData } = pizzasSlice.actions;

export default pizzasSlice.reducer;
