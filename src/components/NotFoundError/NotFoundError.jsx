import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './NotFoundError.module.scss';

const errorStyles = classNames(styles['error-page'], 'content__error-message');

export const NotFoundError = () => {
    return (
        <div className={errorStyles}>
            <div>
                <h1 className={styles['error-page__title']}>404</h1>
                <h2>Oops! Page Not Found</h2>
                <p>
                    Sorry, but the page you are looking for does not exist. Please go back to the
                    home page.
                </p>
                <Link to='/' className='button button--black'>
                    <span>Back To Home</span>
                </Link>
            </div>
        </div>
    );
};
