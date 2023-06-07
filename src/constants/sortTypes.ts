import { SortByEnum } from '../redux/filter';
import { SortListType } from '../interfaces';

export const CATEGORIES = ['All', 'Meat', 'Vegeterian', 'Grill', 'Acute', 'Closed'];

export const PIZZA_TYPE_NAMES = ['Thin', 'Traditional'];

export const POPUP_SORT_TYPE_LIST: SortListType[] = [
    { name: 'popularity (DESC)', sortBy: SortByEnum.RATING_DESC },
    { name: 'popularity (ASC)', sortBy: SortByEnum.RATING_ASC },
    { name: 'price (DESC)', sortBy: SortByEnum.PRICE_DESC },
    { name: 'price (ASC)', sortBy: SortByEnum.PRICE_ASC },
    { name: 'alphabetically (DESC)', sortBy: SortByEnum.TITLE_DESC },
    { name: 'alphabetically (ASC)', sortBy: SortByEnum.TITLE_ASC },
];
