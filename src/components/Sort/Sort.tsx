import React from 'react';

import { setSelectedSortDataType } from '../../redux/filter';
import { useAppDispatch } from '../../hooks/redux';
import { SortListType } from '../../interfaces';
import { POPUP_SORT_TYPE_LIST } from '../../constants';
import { SortProps } from './Sort.props';

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
        <div className='sort' ref={sortRef}>
            <div className='sort__label'>
                <svg
                    width='10'
                    height='6'
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                        // eslint-disable-next-line max-len
                        d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                        fill='#2C2C2C'
                    />
                </svg>
                <b>Sort by:</b>
                <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>
                    {selectedSortDataType.name}
                </span>
            </div>
            {isVisiblePopup && (
                <div className='sort__popup'>
                    <ul>
                        {POPUP_SORT_TYPE_LIST.map((popupData, i) => (
                            <li
                                key={i}
                                className={
                                    selectedSortDataType.sortBy === popupData.sortBy ? 'active' : ''
                                }
                                onClick={() => handleSelectPopupName(popupData)}>
                                {popupData.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});
