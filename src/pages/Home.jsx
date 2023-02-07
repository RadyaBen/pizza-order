import React from 'react';
import axios from 'axios';

import { Categories, PizzaBlock, Sort } from '../components';

export const Home = () => {
    const [pizzaData, setPizzaData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const controller = new AbortController();

        const fetchPizzas = async () => {
            try {
                const { data } = await axios.get(
                    'https://63d90e445a330a6ae173a6a9.mockapi.io/pizzas',
                );
                setPizzaData(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // eslint-disable-next-line
                    console.log('Axios Error with Message: ' + error.message);
                } else {
                    // eslint-disable-next-line
                    console.log(error);
                }
                setIsLoading(false);
            }
        };

        fetchPizzas();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <div className='container'>
                <div className='content__top'>
                    <Categories />
                    <Sort />
                </div>
                <h2 className='content__title'>All pizzas</h2>
                <div className='content__items'>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        pizzaData.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
                    )}
                </div>
            </div>
        </>
    );
};
