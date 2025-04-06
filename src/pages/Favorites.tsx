import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import { fetchFavorites } from '../redux/slices/favoriteSlice';
import RecipeList from '../components/recipes/RecipeList';
import { HeartIcon, Sparkles } from 'lucide-react';

const Favorites = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { favorites, loading, error } = useSelector((state: RootState) => state.favorites);
  const { user } = useSelector((state: RootState) => state.auth);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user]);

  return (
      <div>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <HeartIcon className="h-10 w-10 text-red-500" />
            <Sparkles className={`h-6 w-6 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            Your Favorite Recipes
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-slate-600'
          }`}>
            All your saved recipes in one delicious collection
          </p>
        </div>

        <RecipeList
            recipes={favorites}
            loading={loading}
            error={error}
        />
      </div>
  );
};

export default Favorites;