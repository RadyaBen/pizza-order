import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';

import { Home } from './pages/Home';
import { RootLayout } from './layouts';

import { ROUTES } from './constants/routes';

import './scss/app.scss';

export const router = createBrowserRouter([
	{
		path: ROUTES.homePage,
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		],
	},
]);

export const App = () => <RouterProvider router={router}></RouterProvider>;