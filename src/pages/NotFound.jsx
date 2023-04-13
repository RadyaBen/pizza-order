import { Header, NotFoundError } from '../components';

export const NotFound = () => {
    return (
        <div className='wrapper'>
            <Header />
			<div className='content'>
				<NotFoundError />
			</div>
        </div>
    );
};
