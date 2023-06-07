import React from 'react';

import { CATEGORIES } from '../../constants';
import { CategoriesProps } from './Categories.props';

export const Categories = React.memo(({
	selectedCategoryIndex,
	onSelectCategory,
}: CategoriesProps) => (
    <div className='categories'>
        <ul>
            {CATEGORIES.map((categoryName, i) => (
                <li
                    key={i}
                    onClick={() => onSelectCategory(i)}
                    className={selectedCategoryIndex === i ? 'active' : ''}>
                    {categoryName}
                </li>
            ))}
        </ul>
    </div>
));
