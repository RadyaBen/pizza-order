import React from 'react';
import classNames from 'classnames';

import Skeleton from 'react-loading-skeleton';

import { CartSkeletonProps } from './CartSkeleton.props';

import 'react-loading-skeleton/dist/skeleton.css';
import cartItemStyles from '../../../ui/CartItem/CartItem.module.scss';
import cartPageStyles from '../../../../pages/CartPage/CartPage.module.scss';

export const CartSkeleton = ({ cartItems }: CartSkeletonProps) => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

	const isMobileResponsive = windowWidth >= 540;

	const contentTitleStyles = classNames(
		'content__title',
		cartPageStyles.content__title,
	);

    return (
        <div className={cartPageStyles.cart}>
            <div className={cartPageStyles.cart__top}>
                <h2 className={contentTitleStyles}>
                    <Skeleton
						width={127}
						height={30}
					/>
                </h2>
                <div className={cartPageStyles.cart__clear}>
                    <Skeleton
						width={106}
						height={25}
					/>
                </div>
            </div>
            {Array(cartItems.length)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className={cartPageStyles.content__items}>
                        <div className={cartItemStyles.cart__item}>
                            <div className={cartItemStyles['cart__item-img']}>
                                {isMobileResponsive ? (
                                    <Skeleton
										circle
										width={75}
										height={75}
									/>
                                ) : (
                                    <Skeleton
										circle
										width={150}
										height={150}
									/>
                                )}
                            </div>
                            <div className={cartItemStyles['cart__item-info']}>
                                <h3>
                                    <Skeleton />
                                </h3>
                                <p>
                                    <Skeleton />
                                </p>
                            </div>
                            <div className={cartItemStyles['cart__item-count']}>
                                <Skeleton
									circle
									width={32}
									height={32}
								/>
                                <Skeleton
									width={14}
									height={30}
								/>
                                <Skeleton
									circle
									width={32}
									height={32}
								/>
                            </div>
                            <div className={cartItemStyles['cart__item-price']}>
                                <Skeleton
									width={60}
									height={30}
								/>
                            </div>
                            <div className={cartItemStyles['cart__item-remove']}>
                                <Skeleton
									circle
									width={32}
									height={32}
								/>
                            </div>
                        </div>
                    </div>
                ))}
            <div className={cartPageStyles.cart__bottom}>
                <div className={cartPageStyles['cart__bottom-details']}>
					<Skeleton
						width={199}
						height={30}
					/>
					<Skeleton
						width={199}
						height={30}
					/>
                </div>
            </div>
            <div className={cartPageStyles['cart__bottom-buttons']}>
                {isMobileResponsive ? (
                    <>
                        <Skeleton
							borderRadius={30}
							width={210}
							height={55}
						/>
                        <Skeleton
							borderRadius={30}
							width={210}
							height={55}
						/>
                    </>
                ) : (
                    <>
                        <Skeleton
							borderRadius={30}
							width={'100%'}
							height={55}
						/>
                        <Skeleton
							borderRadius={30}
							width={'100%'}
							height={55}
						/>
                    </>
                )}
            </div>
        </div>
    );
};
