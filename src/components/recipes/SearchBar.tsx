import React, { useCallback, useState } from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/recipeSlice';
import { RootState } from '../../redux/store';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  showFilters?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ showFilters = false }) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const debouncedSearch = useCallback(
      debounce((term: string) => {
        dispatch(setSearchTerm(term));
      }, 300),
      [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  return (
      <div className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search recipes or ingredients..."
                className={`w-full py-3 pl-12 pr-4 rounded-full transition-all ${
                    isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600'
                        : 'bg-white border-transparent text-slate-900 placeholder-slate-400 shadow-sm hover:shadow-md focus:shadow-lg'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <SearchIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
            </div>
          </div>
          {showFilters && (
              <button
                  type="button"
                  className={`flex items-center px-6 py-3 rounded-full transition-all ${
                      isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                          : 'bg-white hover:shadow-md text-slate-700'
                  }`}
              >
                <FilterIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
          )}
        </div>
      </div>
  );
};

export default SearchBar;