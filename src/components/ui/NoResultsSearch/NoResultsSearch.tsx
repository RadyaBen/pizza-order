import { NoResultsIcon } from '../..';

import { NoResultsSearchProps } from './NoResultSearch.props';

import styles from './NoResultsSearch.module.scss';

export const NoResultsSearch = ({ searchQuery }: NoResultsSearchProps) => {
    return (
        <div className={styles['search-message']}>
            <NoResultsIcon />
            <p>Sorry, no results found for:</p>
            <p>"{searchQuery}"</p>
        </div>
    );
};
