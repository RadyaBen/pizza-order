import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import {
    Categories,
    Pagination,
    PizzaBlock,
    Skeleton,
    Sort,
    popupSortTypeList
} from '../components';

import {
    setSelectedCategoryIndex,
    setSelectedSortDataType,
    setCurrentPage,
    setQueryFilters
} from '../redux/slices/filterSlice';

export const Home = () => {
    const [pizzaData, setPizzaData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const isMounted = React.useRef(false);
    const isQuerySearchString = React.useRef(false);

    const { selectedCategoryIndex, selectedSortDataType, currentPage } = useSelector(
        (state) => state.filter,
    );
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
				selectedCategoryIndex,
                sortBy: selectedSortDataType.sortBy,
                currentPage,
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIndex, selectedSortDataType.sortBy, currentPage]);

    // If there was a first render,
    // then the URL parameters are checked and saved to the state
    React.useEffect(() => {
        const { search } = location;

        if (search) {
            const currentParams = qs.parse(search.substring(1));

            const selectedSortDataType = popupSortTypeList.find(
                (popupData) => popupData.sortBy === currentParams.sortBy,
            );

            dispatch(
                setQueryFilters({
                    ...currentParams,
                    selectedSortDataType,
                }),
            );
            isQuerySearchString.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const abortController = new AbortController();
        const abortSignal = abortController.signal;

        if (!isQuerySearchString.current) {
            fetchPizzas(abortSignal);
        }

        isQuerySearchString.current = false;

        return () => abortController.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIndex, selectedSortDataType, currentPage]);

    const fetchPizzas = async (abortSignal) => {
        const category = selectedCategoryIndex > 0 ? `category=${selectedCategoryIndex}` : '';
        const sortBy = selectedSortDataType.sortBy.replace('-', '');
        const order = selectedSortDataType.sortBy.includes('-') ? 'asc' : 'desc';

        try {
            setIsLoading(true);
            const { data } = await axios.get(
                `https://63d90e445a330a6ae173a6a9.mockapi.io/pizzas?
					page=${currentPage}&limit=4&
					${category}
					&sortBy=${sortBy}
					&order=${order}`,
                { signal: abortSignal },
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
        }
        setIsLoading(false);
    };

    const handleSelectCategoryIndex = (idx) => {
        dispatch(setSelectedCategoryIndex(idx));
    };

    const handlePageChange = (number) => {
        dispatch(setCurrentPage(number));
    };

    const pizzas = pizzaData.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    return (
        <>
            <div className='container'>
                <div className='content__top'>
                    <Categories
                        selectedCategoryIndex={selectedCategoryIndex}
                        onSelectCategory={handleSelectCategoryIndex}
                    />
                    <Sort
                        selectedSortDataType={selectedSortDataType}
                        onSelectSortDataType={setSelectedSortDataType}
                    />
                </div>
                <h2 className='content__title'>All pizzas</h2>
                <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
                <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </>
    );
};
