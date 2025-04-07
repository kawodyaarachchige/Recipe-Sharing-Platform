import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CookingPot, AlertCircle } from 'lucide-react';

interface RecipeListProps {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

const RecipeList: React.FC<RecipeListProps> = ({
                                                   recipes,
                                                   loading,
                                                   error
                                               }) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    if (loading) {
        return (
            <div className={`flex flex-col items-center justify-center h-64 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
            }`}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B15E12] mb-4"></div>
                <p className="text-lg font-medium">Loading recipes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`rounded-lg p-6 ${
                isDarkMode
                    ? 'bg-red-900/50 border border-red-700'
                    : 'bg-red-50 border border-red-200'
            }`}>
                <div className="flex items-center">
                    <AlertCircle className={`h-5 w-5 mr-2 ${
                        isDarkMode ? 'text-red-400' : 'text-red-500'
                    }`} />
                    <p className={`${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className={`text-center py-12 rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
                <CookingPot className={`h-12 w-12 mx-auto mb-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-slate-400'
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-slate-800'
                }`}>
                    No recipes found
                </h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    Try adjusting your search or filters
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
                <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    description={recipe.description}
                    cookingTime={recipe.cookingTime}
                    rating={recipe.rating}
                    imageUrl={recipe.imageUrl}
                    authorName={recipe.authorName}
                />
            ))}
        </div>
    );
};

export default RecipeList;