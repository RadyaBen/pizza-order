import { Header, NotFoundError } from '../components';

export const NotFound = () => {
    return (
        <div className='wrapper'>
            <Header />
            <NotFoundError />
        </div>
    );
};
