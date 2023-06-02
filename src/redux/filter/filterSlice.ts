import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterState, SortByEnum } from './index';
import { SortListType } from '../../interfaces';

const initialState: FilterState = {
    selectedCategoryIndex: 0,
    currentPage: 1,
    searchQuery: '',
    selectedSortDataType: {
        name: 'popularity',
        sortBy: SortByEnum.RATING_DESC,
    },
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSelectedCategoryIndex: (state, action: PayloadAction<number>) => {
            state.selectedCategoryIndex = action.payload;
        },
        setSelectedSortDataType: (state, action: PayloadAction<SortListType>) => {
            state.selectedSortDataType = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setQueryFilters: (state, action: PayloadAction<FilterState>) => {
            if (Object.keys(action.payload).length) {
                state.selectedCategoryIndex = Number(action.payload.selectedCategoryIndex);
                state.currentPage = Number(action.payload.currentPage);
                state.searchQuery = action.payload.searchQuery;
                state.selectedSortDataType = action.payload.selectedSortDataType;
            } else {
                state.selectedCategoryIndex = 0;
                state.currentPage = 1;
                state.searchQuery = '';
                state.selectedSortDataType = {
                    name: 'popularity',
                    sortBy: SortByEnum.RATING_DESC,
                };
            }
        },
    },
});

export const {
    setSelectedCategoryIndex,
    setSelectedSortDataType,
    setCurrentPage,
    setSearchQuery,
    setQueryFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
