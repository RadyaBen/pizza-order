import React from 'react';
import debounce from 'lodash.debounce';

import { setSearchQuery } from '../../../redux/filter';
import { useAppDispatch } from '../../../hooks/redux';

import styles from './Search.module.scss';

export const Search = () => {
    const [searchByTitle, setSearchByTitle] = React.useState('');

    const dispatch = useAppDispatch();

    const handleSearchQuery = ({ target }:
		React.ChangeEvent<HTMLInputElement>,
	) => {
        const { value } = target;
        const isLimitValue = value.length <= 20;

        if (isLimitValue) {
            setSearchByTitle(value);
            updateSearchQuery(value);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateSearchQuery = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchQuery(str));
        }, 200),
        [],
    );

    return (
        <div className={styles.search}>
            <label htmlFor='search-input'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    enableBackground='new 0 0 32 32'
                    className={styles.search__icon}
                    version='1.1'
                    viewBox='0 0 32 32'>
                    <circle
                        cx='14'
                        cy='14'
                        fill='none'
                        id='XMLID_42_'
                        r='9'
                        stroke='#000000'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeMiterlimit='10'
                        strokeWidth='2'
                    />
                    <line
                        fill='none'
                        id='XMLID_44_'
                        stroke='#000000'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeMiterlimit='10'
                        strokeWidth='2'
                        x1='27'
                        x2='20.366'
                        y1='27'
                        y2='20.366'
                    />
                </svg>
            </label>
            <input
                type='search'
                id='search-input'
                className={styles.search__input}
                placeholder='Search pizzas...'
                value={searchByTitle}
                onChange={handleSearchQuery}
            />
        </div>
    );
};
