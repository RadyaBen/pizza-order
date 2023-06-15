import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { PizzaItem } from '../../interfaces';
import { QueryPizzaParameters } from './index';

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
