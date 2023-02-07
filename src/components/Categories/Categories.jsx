import React from 'react';

export const Categories = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);

    const categories = ['All', 'Meat', 'Vegeterian', 'Grill', 'Acute', 'Closed'];

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, i) => (
                    <li
                        key={i}
                        onClick={() => setActiveCategoryIndex(i)}
                        className={activeCategoryIndex === i ? 'active' : ''}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};
