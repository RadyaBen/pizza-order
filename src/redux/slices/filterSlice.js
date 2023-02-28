import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategoryIndex: 0,
    currentPage: 1,
	searchQuery: '',
    selectedSortDataType: {
        name: 'popularity',
        sortBy: 'rating',
    },
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSelectedCategoryIndex: (state, action) => {
            state.selectedCategoryIndex = action.payload;
        },
        setSelectedSortDataType: (state, action) => {
            state.selectedSortDataType = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setQueryFilters: (state, action) => {
            state.selectedCategoryIndex = Number(action.payload.selectedCategoryIndex);
            state.currentPage = Number(action.payload.currentPage);
            state.searchQuery = action.payload.searchQuery;
            state.selectedSortDataType = action.payload.selectedSortDataType;
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
