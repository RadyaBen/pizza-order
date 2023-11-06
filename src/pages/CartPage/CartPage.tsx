import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames';

import {
	ArrowBackIcon,
	Button,
	CartIcon,
	CartItem,
	ConfirmDialog,
	EmptyCart,
	TrashBinIcon,
} from '../../components';

import { clearCart, selectCart } from '../../redux/cart';
import {
	useAppDispatch,
	useAppSelector,
	useDocumentTitle,
} from '../../hooks';
import { getTotalCartPizzasCount } from '../../utils';
import { CartItem as CartItemType } from '../../interfaces';

import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from './CartPage.module.scss';

export const CartPage = () => {
    const dispatch = useAppDispatch();
    const { cartItems, cartTotalPrice } = useAppSelector(selectCart);

	useDocumentTitle('Cart');

    const totalCartPizzasCount = getTotalCartPizzasCount(cartItems);

	const contentTitleStyles = classNames(
		'content__title',
		styles.content__title,
	);
	const backButtonStyles = classNames(
        'button button--outline button--add button--go-back',
        styles['button--go-back'],
    );

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
                    <div className={styles.cart}>
                        <div className={styles.cart__top}>
                            <h2 className={contentTitleStyles}>
                                <CartIcon />
                                Cart
                            </h2>
                            <div
								className={styles.cart__clear}
								onClick={handleClearCart}
							>
                                <TrashBinIcon />

                                <span>Clear cart</span>
                            </div>
                        </div>
                        <div>
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
                        <div className={styles.cart__bottom}>
                            <div className={styles['cart__bottom-details']}>
                                <span>
                                    {' '}
                                    Total pizzas: <b>{totalCartPizzasCount} pcs.</b>{' '}
                                </span>
                                <span>
                                    {' '}
                                    Order price: <b>{cartTotalPrice} ₴</b>{' '}
                                </span>
                            </div>
                            <div className={styles['cart__bottom-buttons']}>
                                <Link
									to='/'
									className={backButtonStyles}
								>
                                    <ArrowBackIcon />

                                    <span>Go back</span>
                                </Link>
                                <Button className={styles['pay-btn']}>
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
