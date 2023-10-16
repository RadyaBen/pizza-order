import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { AddIcon, Button } from '../index';

import { addPizzaToCart, selectCartItem } from '../../redux/cart';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CartItem } from '../../interfaces';
import { ROUTES, PIZZA_TYPE_NAMES } from '../../constants';
import { PizzaBlockProps } from './PizzaBlock.props';

export const PizzaBlock = ({
	id,
	imageUrl,
	title,
	types,
	sizeToPriceMap,
}: PizzaBlockProps) => {
    const [activePizzaType, setActivePizzaType] = React.useState(0);
    const [activePizzaSize, setActivePizzaSize] = React.useState(0);

    const cartItem = useAppSelector(
        selectCartItem(
			id,
			sizeToPriceMap[activePizzaSize].size,
			PIZZA_TYPE_NAMES[activePizzaType],
		),
    );
    const dispatch = useAppDispatch();

    const { pizzaId } = useParams();
    const { pathname } = useLocation();

    const pizzaPrice = sizeToPriceMap[activePizzaSize].price;

    const cartTotalQuantity = cartItem ? cartItem.quantity : 0;

    const isPizzaPageRoute = pathname === `/pizzas/${pizzaId}`;

    const handleAddPizzaToCart = () => {
        const pizza: CartItem = {
            id,
            imageUrl,
            title,
            type: PIZZA_TYPE_NAMES[activePizzaType],
            size: sizeToPriceMap[activePizzaSize].size,
            price: pizzaPrice,
            quantity: 0,
        };
        dispatch(addPizzaToCart(pizza));
    };

    const linkStyles = classNames({
        'disabled-link': isPizzaPageRoute,
    });

    return (
        <div className='pizza-block-wrapper'>
            <div className='pizza-block'>
                {isPizzaPageRoute ? null : (
                    <Link className={linkStyles} to={ROUTES.pizzaPage(id)}>
                        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
                        <h4 className='pizza-block__title'>{title}</h4>
                    </Link>
                )}
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
                        {sizeToPriceMap.map(({ size }, i) => (
                            <li
                                key={i}
                                className={activePizzaSize === i ? 'active' : ''}
                                onClick={() => setActivePizzaSize(i)}>
                                {size} cm.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='pizza-block__bottom'>
                    <div className='pizza-block__price'>From {pizzaPrice} ₴</div>
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