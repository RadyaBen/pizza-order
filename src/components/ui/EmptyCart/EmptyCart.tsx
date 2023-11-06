import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './EmptyCart.module.scss';
import emptyCartImg from '../../../assets/img/empty-cart.png';

const backButtonStyles = classNames(
	'button button--black',
	styles['button--black'],
);

export const EmptyCart = () => (
    <div className={styles['empty-cart']}>
        <h2>
            Your Cart is Empty <span>😕</span>
        </h2>
        <p>
            It looks like you have not added anything to your cart yet. Please go back to the home
            page to order pizzas.
        </p>
        <img src={emptyCartImg} alt='Empty cart' />
        <Link to='/' className={backButtonStyles}>
            <span>Back To Home</span>
        </Link>
    </div>
);
