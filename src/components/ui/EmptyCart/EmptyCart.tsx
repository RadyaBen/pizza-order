import { Link } from 'react-router-dom';

import emptyCartImg from '../../../assets/img/empty-cart.png';

export const EmptyCart = () => (
    <div className='cart cart--empty'>
        <h2>
            Your Cart is Empty <span>😕</span>
        </h2>
        <p>
            It looks like you have not added anything to your cart yet. Please go back to the home
            page to order pizzas.
        </p>
        <img src={emptyCartImg} alt='Empty cart' />
        <Link to='/' className='button button--black'>
            <span>Back To Home</span>
        </Link>
    </div>
);
