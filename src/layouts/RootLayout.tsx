import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import { Header } from '../components';

export const RootLayout = () => {
    return (
        <div className='wrapper'>
            <Header />
            <div className='content'>
                <Outlet />
                <ToastContainer
					position={'top-left'}
                    transition={Slide}
                    autoClose={2000}
                    icon={'🍕'}
                />
            </div>
        </div>
    );
};
