import React from 'react';

import { ArrowTopIcon } from '..';

import { setSelectedSortDataType } from '../../redux/filter';
import { useAppDispatch } from '../../hooks/redux';
import { SortListType } from '../../interfaces';
import { POPUP_SORT_TYPE_LIST } from '../../constants';
import { SortProps } from './Sort.props';

import styles from './Sort.module.scss';

export const Sort = React.memo(({ selectedSortDataType }: SortProps) => {
    const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);
    const sortRef = React.useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const handleClickOutside = ({ target }: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(target as Node)) {
                setIsVisiblePopup(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [isVisiblePopup]);

    const handleSelectPopupName = (data: SortListType) => {
        dispatch(setSelectedSortDataType(data));
        setIsVisiblePopup(!isVisiblePopup);
    };

    return (
        <div className={styles.sort} ref={sortRef}>
            <div className={styles.sort__label}>
                <ArrowTopIcon />
                <b>Sort by:</b>
                <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>
                    {selectedSortDataType.name}
                </span>
            </div>
            {isVisiblePopup && (
                <div className={styles.sort__popup}>
                    <ul>
                        {POPUP_SORT_TYPE_LIST.map((popupData, i) => (
                            <li
                                key={i}
                                className={
                                    selectedSortDataType.sortBy === popupData.sortBy
                                        ? styles.active
                                        : ''
                                }
                                onClick={() => handleSelectPopupName(popupData)}
							>
                                {popupData.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});
