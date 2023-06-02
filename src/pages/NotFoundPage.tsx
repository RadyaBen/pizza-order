import { Header, NotFoundError } from '../components';

export const NotFoundPage = () => {
    return (
        <div className='wrapper'>
            <Header />
			<div className='content'>
				<NotFoundError />
			</div>
        </div>
    );
};
