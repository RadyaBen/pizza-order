import Skeleton from 'react-loading-skeleton';

import { CartSkeletonProps } from './CartSkeleton.props';

import 'react-loading-skeleton/dist/skeleton.css';

export const CartSkeleton = ({ cartItems }: CartSkeletonProps) => (
    <div className='cart'>
        <div className='cart__top'>
            <h2 className='content__title'>
                <Skeleton width={127} height={30} />
            </h2>
            <div className='cart__clear'>
                <Skeleton width={106} height={25} />
            </div>
        </div>
        {Array(cartItems.length)
            .fill(0)
            .map((_, i) => (
                <div key={i} className='content__items'>
                    <div className='cart__item'>
                        <div className='cart__item-img'>
                            <Skeleton circle width={75} height={75} />
                        </div>
                        <div className='cart__item-info'>
                            <Skeleton width={250} height={27} />
                            <Skeleton width={250} height={27} />
                        </div>
                        <div className='cart__item-count'>
                            <Skeleton circle width={32} height={32} />
                            <Skeleton width={14} height={30} />
                            <Skeleton circle width={32} height={32} />
                        </div>
                        <div className='cart__item-price'>
                            <Skeleton width={60} height={30} />
                        </div>
                        <div className='cart__item-remove'>
                            <Skeleton circle width={32} height={32} />
                        </div>
                    </div>
                </div>
            ))}
        <div className='cart__bottom'>
            <div className='cart__bottom-details'>
                <Skeleton width={199} height={30} />
                <Skeleton width={192} height={30} />
            </div>
        </div>
        <div className='cart__bottom-buttons'>
            <Skeleton
				style={{ borderRadius: 30 }}
				width={210}
				height={55}
			/>
            <Skeleton
				style={{ borderRadius: 30 }}
				width={210}
				height={55}
			/>
        </div>
    </div>
);
