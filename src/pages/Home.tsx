import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRecipes } from '../redux/slices/recipeSlice';
import RecipeList from '../components/recipes/RecipeList';
import SearchBar from '../components/recipes/SearchBar';
import {ChefHat, Sparkles, UtensilsCrossed} from 'lucide-react';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredRecipes, loading, error } = useSelector((state: RootState) => state.recipes);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    return (
        <div className={isDarkMode ? 'text-white' : 'text-slate-800'}>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center space-x-3 mb-4">
                    <ChefHat className={`h-10 w-10 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
                    <UtensilsCrossed  className={`h-6 w-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
                </div>
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Kitchen Library
                </h1>
                <p className={`text-lg max-w-2xl mx-auto ${
                    isDarkMode ? 'text-gray-300' : 'text-slate-600'
                }`}>
                    Discover, create, and share your favorite recipes with our community of food lovers
                </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
                <SearchBar showFilters={true} />
            </div>

            <RecipeList
                recipes={filteredRecipes}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default Home;