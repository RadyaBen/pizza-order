import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

import {
	Home,
	PizzaPage,
	Cart,
	NotFound,
} from './pages';
import { RootLayout } from './layouts';

import { ROUTES } from './constants/routes';

import './scss/app.scss';

export const router = createBrowserRouter([
    {
        path: ROUTES.homePage,
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
			{
				path: ROUTES.pizzaPage(),
				element: <PizzaPage />,
			},
            {
                path: ROUTES.cart,
                element: <Cart />,
            },
        ],
    },
]);

export const App = () => <RouterProvider router={router}></RouterProvider>;
