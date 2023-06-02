import { SortListType } from '../../interfaces';

export enum SortByEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}

export interface FilterState {
    selectedCategoryIndex: number;
    currentPage: number;
    searchQuery: string;
    selectedSortDataType: SortListType;
}
