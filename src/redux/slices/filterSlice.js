import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategoryIndex: 0,
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
        setQueryFilters: (state, action) => {
            state.selectedCategoryIndex = Number(action.payload.selectedCategoryIndex);
            state.selectedSortDataType = action.payload.selectedSortDataType;
        },
    },
});

export const {
    setSelectedCategoryIndex,
    setSelectedSortDataType,
    setQueryFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
