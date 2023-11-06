import { confirmAlert } from 'react-confirm-alert';

import { Button, ConfirmDialog, PlusIcon } from '../../index';

import {
    addPizzaToCart,
    decreaseCartQuantity,
    removePizzaFromCart,
} from '../../../redux/cart/cartSlice';
import { useAppDispatch } from '../../../hooks/redux';
import { CartItemProps } from './CartItem.props';

import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from './CartItem.module.scss';

export const CartItem = ({ cartItem }: CartItemProps) => {
    const dispatch = useAppDispatch();

    const handleIncreasePizzaQuantity = () => {
        dispatch(addPizzaToCart(cartItem));
    };

    const handleDecreasePizzaQuantity = () => {
        dispatch(decreaseCartQuantity(cartItem));
    };

    const handleRemovePizza = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <ConfirmDialog
                        title='Delete Confirmation'
                        message='Are you sure you want to delete this item?'
                        deletion='item'
                        onRemovePizza={() =>
							dispatch(removePizzaFromCart(cartItem))
						}
                        onClose={onClose}
                    />
                );
            },
        });
    };

    return (
        <div className={styles.cart__item}>
            <div className={styles['cart__item-img']}>
                <img
					className='pizza-block__image'
					src={cartItem.imageUrl}
					alt='Pizza'
				/>
            </div>
            <div className={styles['cart__item-info']}>
                <h3>{cartItem.title}</h3>
                <p>
                    {cartItem.type}, {cartItem.size} cm.
                </p>
            </div>
            <div className={styles['cart__item-count']}>
                <Button
                    className={styles['cart__item-count-minus']}
                    variant='outline'
                    shape='circle'
                    onClick={() => {
                        cartItem.quantity > 1
							? handleDecreasePizzaQuantity()
							: handleRemovePizza();
                    }}
				>
                    <PlusIcon />
                </Button>
                <b>{cartItem.quantity}</b>
                <Button
                    className={styles['cart__item-count-plus']}
                    variant='outline'
                    shape='circle'
                    onClick={handleIncreasePizzaQuantity}
				>
                    <PlusIcon />
                </Button>
            </div>
            <div className={styles['cart__item-price']}>
                <b>{cartItem.price * cartItem.quantity} ₴</b>
            </div>
            <div className={styles['cart__item-remove']}>
                <Button
					className={styles.button}
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
