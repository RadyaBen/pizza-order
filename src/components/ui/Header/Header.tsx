import { Link, useLocation } from 'react-router-dom';

import { CartIcon, Search } from '../../index';

import { selectCart } from '../../../redux/cart';
import { useAppSelector } from '../../../hooks/redux';
import { getTotalCartPizzasCount } from '../../../utils';

import pizzaLogo from '../../../assets/img/pizza-logo.svg';

export const Header = () => {
    const { cartItems, cartTotalPrice } = useAppSelector(selectCart);

    const location = useLocation();

    const totalCartPizzasCount = getTotalCartPizzasCount(cartItems);

    return (
        <div className='header'>
            <div className='container'>
                <Link to='/'>
                    <div className='header__logo'>
                        <img width='38' src={pizzaLogo} alt='Pizza logo' />
                        <div>
                            <h1>Pizza Order</h1>
                            <p>It is worth just a bite, we will not forget this taste!</p>
                        </div>
                    </div>
                </Link>
                {location.pathname !== '/cart' && <Search />}
                <div className='header__cart'>
                    {location.pathname !== '/cart' && (
                        <Link to='/cart' className='button button--cart'>
                            <span>{cartTotalPrice} ₴</span>
                            <div className='button__delimiter'></div>
                            <CartIcon />
                            <span>{totalCartPizzasCount}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
