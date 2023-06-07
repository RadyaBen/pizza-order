import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import classNames from 'classnames';

import {
    Categories,
    Pagination,
    PizzaBlock,
    ErrorMessage,
    Skeleton,
    Sort,
    NoResultsSearch,
} from '../components';

import {
    setSelectedCategoryIndex,
    setCurrentPage,
    setQueryFilters,
    selectFilter,
} from '../redux/filter';
import {
	selectPizzaData,
	QueryPizzaParameters,
	fetchPizzas,
} from '../redux/pizzas';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { PizzaItem } from '../interfaces';
import { POPUP_SORT_TYPE_LIST } from '../constants';

export const HomePage = () => {
    const isMounted = React.useRef(false);
    const isQuerySearchString = React.useRef(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const {
		pizzas,
		pizzasRequestStatus,
		requestError,
	} = useAppSelector(selectPizzaData);
    const {
		selectedCategoryIndex,
		selectedSortDataType,
		currentPage,
		searchQuery,
	} = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                selectedCategoryIndex,
                sortBy: selectedSortDataType.sortBy,
                search: searchQuery,
                currentPage,
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIndex, selectedSortDataType.sortBy, searchQuery, currentPage]);

    // If there was a first render,
    // then the URL parameters are checked and saved to the state
    React.useEffect(() => {
        const { search } = location;

        if (search) {
            const currentParams = qs.parse(search.substring(1)) as unknown as QueryPizzaParameters;

            const selectedSortDataType = POPUP_SORT_TYPE_LIST.find(
                (popupData) => popupData.sortBy === currentParams.sortBy,
            );

            dispatch(
                setQueryFilters({
                    selectedCategoryIndex: Number(currentParams.category),
                    currentPage: Number(currentParams.currentPage),
                    searchQuery: currentParams.search,
                    selectedSortDataType: selectedSortDataType || POPUP_SORT_TYPE_LIST[0],
                }),
            );
            isQuerySearchString.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (!isQuerySearchString.current) {
            getAllPizzas();
        }

        isQuerySearchString.current = false;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIndex, selectedSortDataType.sortBy, searchQuery, currentPage]);

    const getAllPizzas = async () => {
        const category = selectedCategoryIndex > 0 ? `category=${selectedCategoryIndex}` : '';
        const sortBy = selectedSortDataType.sortBy.replace('-', '');
        const order = selectedSortDataType.sortBy.includes('-') ? 'asc' : 'desc';
        const search = searchQuery ? `&search=${searchQuery}` : '';

        dispatch(
            fetchPizzas({
                category,
                sortBy,
                order,
                search,
                currentPage: String(currentPage),
            }),
        );

		scrollToTop();
    };

    const handleSelectCategoryIndex = React.useCallback((idx: number) => {
        dispatch(setSelectedCategoryIndex(idx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

	const scrollToTop = () => {
		if (containerRef.current) {
			containerRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

    const pizzaData = pizzas.map((pizza: PizzaItem) => <PizzaBlock key={pizza.id} {...pizza} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
    const contentStyles = classNames({
        'content__search-message': !pizzas.length && pizzasRequestStatus === 'succeeded',
        'content__items': pizzas.length && pizzasRequestStatus === 'succeeded',
    });

    return (
        <>
            <div className='container' ref={containerRef}>
                <div className='content__top'>
                    <Categories
                        selectedCategoryIndex={selectedCategoryIndex}
                        onSelectCategory={handleSelectCategoryIndex}
                    />
                    <Sort selectedSortDataType={selectedSortDataType} />
                </div>
                <h2 className='content__title'>All pizzas</h2>
                {pizzasRequestStatus === 'error' ? (
                    <ErrorMessage requestError={requestError} />
                ) : (
                    <div className={contentStyles}>
                        {pizzasRequestStatus === 'loading' ? (
                            skeletons
                        ) : !pizzas.length && pizzasRequestStatus === 'succeeded' ? (
                            <NoResultsSearch searchQuery={searchQuery} />
                        ) : (
                            pizzaData
                        )}
                    </div>
                )}
                <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </>
    );
};
