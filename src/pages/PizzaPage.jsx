import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import {
	PizzaBlock,
	Skeleton,
	NotFoundError,
} from '../components';

export const PizzaPage = () => {
    const [pizza, setPizza] = React.useState(null);
    const [isRequestError, setIsRequestError] = React.useState(false);

    const { pizzaId } = useParams();

    React.useEffect(() => {
        const abortController = new AbortController();
        const abortSignal = abortController.signal;

        fetchPizza(abortSignal);

        return () => abortController.abort();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPizza = async (abortSignal) => {
        const API_ENDPOINT = process.env.REACT_APP_PIZZAS_API_ENDPOINT;

        try {
            const { data } = await axios.get(API_ENDPOINT + pizzaId, {
                signal: abortSignal,
            });
            setPizza(data);
        } catch (error) {
            setIsRequestError(true);
        }
    };

    const pizzaStyles = classNames({
        'content__skeleton': !pizza,
        'container': pizza,
    });

    return (
        <div className={pizzaStyles}>
            {isRequestError ? (
                <NotFoundError />
            ) : !pizza ? (
                <Skeleton />
            ) : (
                <PizzaBlock {...pizza} />
            )}
        </div>
    );
};
