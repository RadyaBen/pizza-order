import { PizzaItem } from '../../interfaces';

export enum PizzasRequestStatus {
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    ERROR = 'error',
}

export interface QueryPizzaParameters {
    category: string;
    sortBy: string;
    order: string;
    search: string;
    currentPage: string;
}

export interface PizzasState {
    pizzas: PizzaItem[];
    pizzasRequestStatus: PizzasRequestStatus;
    requestError: string;
}
