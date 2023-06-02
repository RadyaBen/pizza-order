import { createBrowserRouter } from 'react-router-dom';

import {
	HomePage,
	PizzaPage,
	CartPage,
	NotFoundPage,
} from '../pages';
import { RootLayout } from '../layouts/RootLayout';

import { ROUTES } from '../constants';

export const router = createBrowserRouter([
    {
        path: ROUTES.homePage,
        element: <RootLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: ROUTES.pizzaPage(),
                element: <PizzaPage />,
            },
            {
                path: ROUTES.cartPage,
                element: <CartPage />,
            },
        ],
    },
]);
