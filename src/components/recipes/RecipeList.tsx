import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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

    const loadingContainerClasses = `flex justify-center items-center h-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
    const errorClasses = `${isDarkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded`;
    const emptyStateClasses = `text-center py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
    const emptyStateHeadingClasses = `text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`;
    const emptyStateTextClasses = `mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
    const gridClasses = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;

    if (loading) {
        return (
            <div className={loadingContainerClasses}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={errorClasses}>
                <p>Error loading recipes: {error}</p>
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className={emptyStateClasses}>
                <h3 className={emptyStateHeadingClasses}>
                    No recipes found
                </h3>
                <p className={emptyStateTextClasses}>
                    Try adjusting your search or filters
                </p>
            </div>
        );
    }

    return (
        <div className={gridClasses}>
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