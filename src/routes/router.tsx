import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

import { HomePage, NotFoundPage } from '../pages';
import { RootLayout } from '../layouts/RootLayout';
import { LazyLoadPage } from '../components';
import { ROUTES } from '../constants';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
			path={ROUTES.homePage}
			element={<RootLayout />}
			errorElement={<NotFoundPage />}
		>
            <Route
				index
				element={<HomePage />}
			/>
           <Route
				path={ROUTES.pizzaPage()}
				element={
					<LazyLoadPage
						folderName='PizzaPage'
						componentName='PizzaPage'
					/>
				}
			/>
            <Route
				path={ROUTES.cartPage}
				element={
					<LazyLoadPage
						folderName='CartPage'
						componentName='CartPage'
					/>
				}
			/>
        </Route>,
    ),
);
