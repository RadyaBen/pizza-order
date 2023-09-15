import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

import {
	ArrowBackIcon,
	Button,
	CartIcon,
	CartItem,
	ConfirmDialog,
	EmptyCart,
	TrashBinIcon,
} from '../components';

import { clearCart, selectCart } from '../redux/cart';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getTotalCartPizzasCount } from '../utils';
import { CartItem as CartItemType } from '../interfaces';

import 'react-confirm-alert/src/react-confirm-alert.css';

export const CartPage = () => {
    const dispatch = useAppDispatch();
    const { cartItems, cartTotalPrice } = useAppSelector(selectCart);

    const totalCartPizzasCount = getTotalCartPizzasCount(cartItems);

    const handleClearCart = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <ConfirmDialog
                        title='Delete Confirmation'
                        message='Are you sure you want to delete all items?'
                        deletion='items'
                        onClearCart={() => dispatch(clearCart())}
                        onClose={onClose}
                    />
                );
            },
        });
    };

    return (
        <>
            {!cartItems.length ? (
                <EmptyCart />
            ) : (
                <div className='container container--cart'>
                    <div className='cart'>
                        <div className='cart__top'>
                            <h2 className='content__title'>
                                <CartIcon />
                                Cart
                            </h2>
                            <div className='cart__clear' onClick={handleClearCart}>
                                <TrashBinIcon />

                                <span>Clear cart</span>
                            </div>
                        </div>
                        <div className='content__items'>
                            {cartItems.map((cartItem: CartItemType) => (
                                <CartItem
                                    key={`cartItem-
										${cartItem.id}
										${cartItem.size}
										${cartItem.type}`
									}
                                    cartItem={cartItem}
                                />
                            ))}
                        </div>
                        <div className='cart__bottom'>
                            <div className='cart__bottom-details'>
                                <span>
                                    {' '}
                                    Total pizzas: <b>{totalCartPizzasCount} pcs.</b>{' '}
                                </span>
                                <span>
                                    {' '}
                                    Order price: <b>{cartTotalPrice} ₴</b>{' '}
                                </span>
                            </div>
                            <div className='cart__bottom-buttons'>
                                <Link
                                    to='/'
                                    className='button button--outline button--add button--go-back'>
                                    <ArrowBackIcon />

                                    <span>Go back</span>
                                </Link>
                                <Button className='button pay-btn'>
                                    <span>Pay now</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
