import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from '../index';
import { addPizzaToCart, selectCartItemById } from '../../redux/cart';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CartItem } from '../../interfaces';
import { ROUTES, PIZZA_TYPE_NAMES } from '../../constants';
import { PizzaBlockProps } from './PizzaBlock.props';

export const PizzaBlock = ({
	id,
	imageUrl,
	title,
	types,
	sizes,
	price,
}: PizzaBlockProps) => {
    const [activePizzaType, setActivePizzaType] = React.useState(0);
    const [activePizzaSize, setActivePizzaSize] = React.useState(0);

    const cartItem = useAppSelector(selectCartItemById(id));
    const dispatch = useAppDispatch();

	const { pizzaId } = useParams();
	const location = useLocation();

    const cartTotalQuantity = cartItem ? cartItem.quantity : 0;

    const handleAddPizzaToCart = () => {
        const pizza: CartItem = {
			id,
			imageUrl,
			title,
			type: PIZZA_TYPE_NAMES[activePizzaType],
			size: sizes[activePizzaSize],
			price,
			quantity: 0,
		};
        dispatch(addPizzaToCart(pizza));
    };

    const linkStyles = classNames({
        'disabled-link': location.pathname === `/pizzas/${pizzaId}`,
    });

    return (
        <div className='pizza-block-wrapper'>
            <div className='pizza-block'>
                <Link className={linkStyles} to={ROUTES.pizzaPage(id)}>
                    <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
                    <h4 className='pizza-block__title'>{title}</h4>
                </Link>
                <div className='pizza-block__selector'>
                    <ul>
                        {types.map((typeNumber) => (
                            <li
                                key={typeNumber}
                                className={activePizzaType === typeNumber ? 'active' : ''}
                                onClick={() => setActivePizzaType(typeNumber)}>
                                {PIZZA_TYPE_NAMES[typeNumber]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((size, i) => (
                            <li
                                key={size}
                                className={activePizzaSize === i ? 'active' : ''}
                                onClick={() => setActivePizzaSize(i)}>
                                {size} cm.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='pizza-block__bottom'>
                    <div className='pizza-block__price'>From {price} ₴</div>
                    <Button
						variant='outline'
						name='add'
                        onClick={handleAddPizzaToCart}
					>
                        <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                // eslint-disable-next-line max-len
                                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                                fill='white'
                            />
                        </svg>
                        <span>Add</span>
                        {cartTotalQuantity > 0 && <i>{cartTotalQuantity}</i>}
                    </Button>
                </div>
            </div>
        </div>
    );
};
