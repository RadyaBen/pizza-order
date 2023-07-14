import Skeleton from 'react-loading-skeleton';

import { PizzaSkeletonProps } from './PizzaSkeletonProps';

import 'react-loading-skeleton/dist/skeleton.css';

export const PizzaSkeleton = ({ skeletonsQuantity }: PizzaSkeletonProps) => (
    <>
        {Array(skeletonsQuantity)
            .fill(0)
            .map((_, i) => (
                <div key={i} className='pizza-block-wrapper'>
                    <div className='pizza-block'>
                        <div>
                            <Skeleton circle width={245} height={245} />
                        </div>
                        <div className='pizza-block__title'>
                            <Skeleton
                                style={{ marginTop: 20 }}
                                width={280}
                                height={24}
                            />
                        </div>
                        <div>
                            <Skeleton
								borderRadius={10}
								width={280}
								height={80}
							/>
                        </div>
                        <div className='pizza-block__bottom'>
                            <div>
                                <Skeleton width={121} height={28} />
                            </div>
                            <div>
                                <Skeleton
									borderRadius={30}
									width={108}
									height={44}
								/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
    </>
);