import { useState } from 'react';
import './CategoryFilter.css'

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }: CategoryFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedCategories = isExpanded ? categories : categories.slice(0, 5);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {displayedCategories.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategories.includes(category)
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            {category}
          </button>
        ))}
        {categories.length > 5 && (
          <button
            onClick={toggleExpand}
            className="px-3 py-1 rounded-full text-sm bg-white border border-secondary-300 text-secondary-700 hover:bg-secondary-50"
          >
            {isExpanded ? 'Show Less' : `+${categories.length - 5} More`}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;