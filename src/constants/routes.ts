import { Routes } from '../interfaces';

export const ROUTES: Routes = {
    homePage: '/',
    pizzaPage: (pizzaId = null) => (pizzaId ? `/pizzas/${pizzaId}` : '/pizzas/:pizzaId'),
    cartPage: '/cart',
};
