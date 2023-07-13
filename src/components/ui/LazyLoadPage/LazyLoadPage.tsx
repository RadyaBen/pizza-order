import React from 'react';
import classNames from 'classnames';

import { CartSkeleton, PizzaSkeleton } from '../../index';
import { selectCart } from '../../../redux/cart';
import { useAppSelector } from '../../../hooks/redux';
import { LazyLoadPageProps } from './LazyLoadPage.props';

export const LazyLoadPage = ({ componentName }: LazyLoadPageProps) => {
    const { cartItems } = useAppSelector(selectCart);

    const Component = React.useMemo(
        () =>
            React.lazy(() =>
                import(
                    /* webpackChunkName: "[request]" */
                    `../../../pages/${componentName}`
                ).then((module) => ({
                    default: module[componentName],
                })),
            ),
        [componentName],
    );
	
	const isPizzaPage = componentName === 'PizzaPage';
	const isCartPage = componentName === 'CartPage';
	
    const fallbackStyles = classNames({
        'content__skeleton': isPizzaPage,
        'container container--cart': isCartPage,
    });

    return (
        <>
            <React.Suspense
                fallback={
                    <div className={fallbackStyles}>
                        {isPizzaPage ? (
                            <PizzaSkeleton />
                        ) : (
                            <CartSkeleton cartItems={cartItems} />
                        )}
                    </div>
                }>
                <Component />
            </React.Suspense>
        </>
    );
};
