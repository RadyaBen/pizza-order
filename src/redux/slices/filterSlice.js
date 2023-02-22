import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategoryIndex: 0,
    currentPage: 1,
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
        setQueryFilters: (state, action) => {
            state.selectedCategoryIndex = Number(action.payload.selectedCategoryIndex);
            state.currentPage = Number(action.payload.currentPage);
            state.selectedSortDataType = action.payload.selectedSortDataType;
        },
    },
});

export const {
    setSelectedCategoryIndex,
    setSelectedSortDataType,
    setCurrentPage,
    setQueryFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
