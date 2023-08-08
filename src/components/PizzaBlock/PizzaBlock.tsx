import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { AddIcon, Button } from '../index';

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
                        <AddIcon />
                        <span>Add</span>
                        {cartTotalQuantity > 0 && <i>{cartTotalQuantity}</i>}
                    </Button>
                </div>
            </div>
        </div>
    );
};
