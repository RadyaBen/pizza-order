import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { CartIcon, Search } from '../../index';

import { selectCart } from '../../../redux/cart';
import { useAppSelector } from '../../../hooks/redux';
import { getTotalCartPizzasCount } from '../../../utils';

import styles from './Header.module.scss';
import pizzaLogo from '../../../assets/img/pizza-logo.svg';

export const Header = () => {
    const { cartItems, cartTotalPrice } = useAppSelector(selectCart);

	const { pizzaId } = useParams();
    const { pathname } = useLocation();

    const totalCartPizzasCount = getTotalCartPizzasCount(cartItems);

	const isCartPageRoute = pathname !== '/cart';
	const isPizzaPageRoute = pathname !== `/pizzas/${pizzaId}`;

	const headerStyles = classNames(
		'container',
		styles['container'],
	);

    return (
        <div className={styles.header}>
            <div className={headerStyles}>
                <Link to='/'>
                    <div className={styles.header__logo}>
                        <img width='38' src={pizzaLogo} alt='Pizza logo' />
                        <div>
                            <h1>Pizza Order</h1>
                            <p>It is worth just a bite, we will not forget this taste!</p>
                        </div>
                    </div>
                </Link>
                {isCartPageRoute && isPizzaPageRoute && (
                    <Search />
                )}
                <div className={styles.header__cart}>
                    {isCartPageRoute && (
                        <Link to='/cart' className='button button--cart'>
                            <span>{cartTotalPrice} ₴</span>
                            <div className={styles['header__cart-button-delimiter']}></div>
                            <CartIcon />
                            <span>{totalCartPizzasCount}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
