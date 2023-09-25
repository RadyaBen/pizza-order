import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import {
	PizzaBlock,
	PizzaSkeleton,
	NotFoundError,
} from '../../components';

import { PizzaItem } from '../../interfaces';

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

    const pizzaStyles = classNames({
        'content__skeleton': !pizza,
        'container': pizza,
    });

    return (
        <div className={pizzaStyles}>
            {isRequestError ? (
                <NotFoundError />
            ) : !pizza ? (
                <PizzaSkeleton />
            ) : (
                <PizzaBlock {...pizza} />
            )}
        </div>
    );
};
