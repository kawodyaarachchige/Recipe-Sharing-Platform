import React, { useCallback, useState } from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/recipeSlice';
import debounce from 'lodash/debounce'
interface SearchBarProps {
  showFilters?: boolean;
}
const SearchBar: React.FC<SearchBarProps> = ({
  showFilters = false
}) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const debouncedSearch = useCallback(debounce((term: string) => {
    dispatch(setSearchTerm(term));
  }, 300), [dispatch]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };
  return <div className="mb-8">
      <div className="flex">
        <div className="relative flex-grow">
          <input type="text" value={search} onChange={handleSearchChange} placeholder="Search recipes or ingredients..." className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {showFilters && <button type="button" className="ml-2 flex items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg transition-colors">
            <FilterIcon className="h-5 w-5 mr-1" />
            Filters
          </button>}
      </div>
    </div>;
};
export default SearchBar;