import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import { fetchRecipes } from '../redux/slices/recipeSlice';
import RecipeList from '../components/recipes/RecipeList';
import SearchBar from '../components/recipes/SearchBar';
import { BookOpenIcon } from 'lucide-react';
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    filteredRecipes,
    loading,
    error
  } = useSelector((state: RootState) => state.recipes);
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);
  return <div>
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
        <BookOpenIcon className="mr-2" />
        Welcome to Kitchen Library
      </h1>
      <p className="text-gray-600 mt-2">
        Find the perfect recipe for your next meal
      </p>
    </div>
    <SearchBar showFilters={true} />
    <RecipeList recipes={filteredRecipes} loading={loading} error={error} />
  </div>;
};
export default Home;