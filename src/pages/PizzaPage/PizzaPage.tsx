import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import {
	PizzaBlock,
	PizzaSkeleton,
	NotFoundError,
	ArrowBackIcon,
} from '../../components';

import { PizzaItem } from '../../interfaces';

import styles from './PizzaPage.module.scss';

export const PizzaPage = () => {
    const [pizza, setPizza] = React.useState<PizzaItem | null>(null);
    const [isRequestError, setIsRequestError] = React.useState(false);
    const isEffectRun = React.useRef(false);

    const { pizzaId } = useParams();

    React.useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        if (isEffectRun.current) {
            fetchPizza(signal);
        }

        return () => {
            abortController.abort();
            isEffectRun.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPizza = async (abortSignal: AbortSignal) => {
        const API_ENDPOINT = process.env.REACT_APP_PIZZAS_API_ENDPOINT;

        try {
            const { data } = await axios.get<PizzaItem>(API_ENDPOINT + pizzaId, {
                signal: abortSignal,
            });
            setPizza(data);
        } catch (error) {
            setIsRequestError(true);
        }
    };

    return (
        <>
            {isRequestError ? (
                <NotFoundError />
            ) : !pizza ? (
                <PizzaSkeleton />
            ) : (
                <div className={`container ${styles.pizza}`}>
                    <img
                        className={styles['pizza__image']}
                        src={pizza.imageUrl}
                        alt={pizza.title}
                    />
                    <div className={styles['pizza__content']}>
                        <h2 className={styles['pizza__title']}>
							{pizza.title}
						</h2>
                        <p className={styles['pizza__description']}>
							{pizza.description}
						</p>
                        <PizzaBlock {...pizza} />
                        <div className={styles['pizza__bottom']}>
                            <Link
								to='/'
								className='button button--outline button--go-back'
							>
                                <ArrowBackIcon />
                                <span>Back To Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
