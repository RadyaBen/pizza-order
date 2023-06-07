import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';

import './scss/app.scss';

export const App = () => <RouterProvider router={router}></RouterProvider>;
