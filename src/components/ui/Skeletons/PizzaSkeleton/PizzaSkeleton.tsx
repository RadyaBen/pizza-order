import Skeleton from 'react-loading-skeleton';

import { PizzaSkeletonProps } from './PizzaSkeletonProps';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from '../../../../pages/PizzaPage/PizzaPage.module.scss';

export const PizzaSkeleton = ({
	skeletonsQuantity,
	isHomePageSkeleton,
}: PizzaSkeletonProps) => {
    const pizzaBlockSkeletonItems = (
        <>
            <div>
                <Skeleton
					borderRadius={10}
					height={88}
				/>
            </div>
            <div className='pizza-block__bottom'>
                <div className='pizza-block__price'>
                    <Skeleton
						width={121}
						height={28}
					/>
                </div>
                <div>
                    <Skeleton
						borderRadius={30}
						width={108}
						height={44}
					/>
                </div>
            </div>
        </>
    );

    return (
        <>
            {Array(skeletonsQuantity)
                .fill(0)
                .map((_, i) =>
                    isHomePageSkeleton ? (
                        <div key={i} className='pizza-block-wrapper'>
                            <div className='pizza-block'>
                                <div>
                                    <Skeleton
										circle
										width={245}
										height={245}
									/>
                                </div>
                                <div>
                                    <Skeleton
                                        className='pizza-block__title'
                                        style={{ marginTop: 20 }}
                                    />
                                </div>
                                <div>
									{pizzaBlockSkeletonItems}
								</div>
                            </div>
                        </div>
                    ) : (
                        <div key={i} className={`container ${styles.pizza}`}>
                            <div>
                                <Skeleton
									className={styles['pizza__image']}
									circle
								/>
                            </div>
                            <div className={styles['pizza__content']}>
                                <div>
                                    <Skeleton
                                        className={styles['pizza__title']}
                                        style={{ margin: '30px 0' }}
                                    />
                                </div>
                                <div>
                                    <Skeleton className={styles['pizza__description']} />
                                </div>
                                <div className='pizza-block-wrapper'>
                                    <div className='pizza-block'>
                                        {pizzaBlockSkeletonItems}
                                        <div className={styles['pizza__bottom']}>
                                            <Skeleton
                                                style={{ marginTop: 60 }}
                                                borderRadius={30}
                                                width={210}
                                                height={44}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
                )}
        </>
    );
};
