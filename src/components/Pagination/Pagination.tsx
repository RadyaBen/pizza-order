import ReactPaginate from 'react-paginate';

import { PaginationProps } from './Pagination.props';

import styles from './Pagination.module.scss';

export const Pagination = ({
	currentPage,
	onPageChange,
}: PaginationProps) => (
    <ReactPaginate
        className={styles.pagination}
        breakLabel='...'
        nextLabel='>'
        previousLabel='<'
        onPageChange={(e) => onPageChange(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
    />
);
