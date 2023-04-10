export const ROUTES = {
    homePage: '/',
    pizzaPage: (pizzaId = null) => (pizzaId ? `/pizzas/${pizzaId}` : '/pizzas/:pizzaId'),
    cart: '/cart',
};
