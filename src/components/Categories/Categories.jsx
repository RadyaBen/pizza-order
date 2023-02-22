export const Categories = ({
	selectedCategoryIndex,
	onSelectCategory,
}) => {
    const categories = ['All', 'Meat', 'Vegeterian', 'Grill', 'Acute', 'Closed'];

    return (
        <div className='categories'>
            <ul>
                {categories.map((categoryName, i) => (
                    <li
                        key={i}
                        onClick={() => onSelectCategory(i)}
                        className={selectedCategoryIndex === i ? 'active' : ''}>
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};