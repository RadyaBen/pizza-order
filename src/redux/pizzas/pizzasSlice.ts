import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { PizzaItem } from '../../interfaces';
import {
	PizzasRequestStatus,
	QueryPizzaParameters,
	PizzasState,
} from './index';

interface FetchPizzasError {
    message: string;
}

export const fetchPizzas = createAsyncThunk<
    PizzaItem[],
    QueryPizzaParameters,
    {
        rejectValue: FetchPizzasError;
    }
>('pizzas/fetchPizzas', async (params, { rejectWithValue, signal }) => {
    const { category, sortBy, order, search, currentPage } = params;

    const API_ENDPOINT = process.env.REACT_APP_PIZZAS_API_ENDPOINT;

    try {
        const { data } = await axios.get<PizzaItem[]>(
            API_ENDPOINT +
                `?page=${currentPage}&limit=4&
					${category}
					&sortBy=${sortBy}
					&order=${order}
					${search}`,
            { signal },
        );
        return data;
    } catch (err) {
        const error = err as AxiosError<FetchPizzasError>;
        if (!error.response) {
            throw err;
        }
        return rejectWithValue(error.message as unknown as FetchPizzasError);
    }
});

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
