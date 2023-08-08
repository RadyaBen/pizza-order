import { confirmAlert } from 'react-confirm-alert';

import { Button, ConfirmDialog, PlusIcon } from '../../index';

import {
    addPizzaToCart,
    decreaseCartQuantity,
    removePizzaFromCart,
} from '../../../redux/cart/cartSlice';
import { useAppDispatch } from '../../../hooks/redux';
import { CartItem as CartItemType } from '../../../interfaces';
import { CartItemProps } from './CartItem.props';

import 'react-confirm-alert/src/react-confirm-alert.css';

export const CartItem = ({
    cartItem: {
		id,
		imageUrl,
		title,
		type,
		size,
		price,
		quantity,
	}}: CartItemProps) => {
    const dispatch = useAppDispatch();

    const handleIncreasePizzaQuantity = () => {
        dispatch(
            addPizzaToCart({
                id,
            } as CartItemType),
        );
    };

    const handleDecreasePizzaQuantity = () => {
        dispatch(decreaseCartQuantity(id));
    };

    const handleRemovePizza = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <ConfirmDialog
                        title='Delete Confirmation'
                        message='Are you sure you want to delete this item?'
                        deletion='item'
                        onRemovePizza={() => dispatch(removePizzaFromCart(id))}
                        onClose={onClose}
                    />
                );
            },
        });
    };

    return (
        <div className='cart__item'>
            <div className='cart__item-img'>
                <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
            </div>
            <div className='cart__item-info'>
                <h3>{title}</h3>
                <p>
                    {type}, {size} cm.
                </p>
            </div>
            <div className='cart__item-count'>
                <Button
                    className='cart__item-count-minus'
                    variant='outline'
                    shape='circle'
                    onClick={() => {
                        quantity > 1 ? handleDecreasePizzaQuantity() : handleRemovePizza();
                    }}
				>
                    <PlusIcon />
                </Button>
                <b>{quantity}</b>
                <Button
                    className='cart__item-count-plus'
                    variant='outline'
                    shape='circle'
                    onClick={handleIncreasePizzaQuantity}
				>
                    <PlusIcon />
                </Button>
            </div>
            <div className='cart__item-price'>
                <b>{price * quantity} ₴</b>
            </div>
            <div className='cart__item-remove'>
                <Button
					variant='outline'
					shape='circle'
					onClick={handleRemovePizza}
				>
					<PlusIcon />
                </Button>
            </div>
        </div>
    );
};
