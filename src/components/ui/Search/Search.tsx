import React from 'react';
import debounce from 'lodash.debounce';

import { SearchIcon } from '../..';

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
                <SearchIcon />
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
