import React from 'react';

import { CartSkeleton, PizzaSkeleton } from '../../index';
import { selectCart } from '../../../redux/cart';
import { useAppSelector } from '../../../hooks/redux';
import { LazyLoadPageProps } from './LazyLoadPage.props';

export const LazyLoadPage = ({
	folderName,
	componentName,
}: LazyLoadPageProps) => {
    const { cartItems } = useAppSelector(selectCart);

    const Component = React.useMemo(
        () =>
            React.lazy(() =>
                import(
                    /* webpackChunkName: "[request]" */
                    `../../../pages/${folderName}/${componentName}`
                ).then((module) => ({
                    default: module[componentName],
                })),
            ),
        [folderName, componentName],
    );

    const isPizzaPage = componentName === 'PizzaPage';

    return (
        <>
            <React.Suspense
                fallback={
                    <>
                        {isPizzaPage ? (
                            <PizzaSkeleton />
                        ) : (
                            <div className='container container--cart'>
                                <CartSkeleton cartItems={cartItems} />
                            </div>
                        )}
                    </>
                }>
                <Component />
            </React.Suspense>
        </>
    );
};