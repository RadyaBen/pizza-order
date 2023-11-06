import React from 'react';

import { CATEGORIES } from '../../constants';
import { CategoriesProps } from './Categories.props';

import styles from './Categories.module.scss';

export const Categories = React.memo(({
	selectedCategoryIndex,
	onSelectCategory,
}: CategoriesProps) => (
    <div className={styles.categories}>
        <ul>
            {CATEGORIES.map((categoryName, i) => (
                <li
                    key={i}
                    onClick={() => onSelectCategory(i)}
                    className={
						selectedCategoryIndex === i
						? styles.active
						: ''
					}
				>
                    {categoryName}
                </li>
            ))}
        </ul>
    </div>
));
