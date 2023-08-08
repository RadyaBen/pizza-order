import { NoResultsIcon } from '../..';

import { NoResultsSearchProps } from './NoResultSearch.props';

export const NoResultsSearch = ({ searchQuery }: NoResultsSearchProps) => {
    return (
        <>
            <NoResultsIcon />
            <p>Sorry, no results found for:</p>
            <p>"{searchQuery}"</p>
        </>
    );
};
