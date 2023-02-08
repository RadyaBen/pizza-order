import { Link } from 'react-router-dom';

import styles from './NotFoundError.module.scss';

export const NotFoundError = () => {
    return (
        <>
            <div className={styles.error}>
                <div>
                    <h1 className={styles.error__title}>404</h1>
                    <h2>Oops! Page Not Found</h2>
                    <p>
                        Sorry, but the page you are looking for does not exist. Please, go back to
                        the home page.
                    </p>
                    <Link to='/' className='button button--black'>
                        <span>Back To Home</span>
                    </Link>
                </div>
            </div>
        </>
    );
};
