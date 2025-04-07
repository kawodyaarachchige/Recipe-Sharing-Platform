import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {fetchRecipeById, deleteRecipe} from '../redux/slices/recipeSlice';
import {addToFavorites, removeFromFavorites} from '../redux/slices/favoriteSlice';
import {
    ClockIcon,
    UsersIcon,
    StarIcon,
    HeartIcon,
    TrashIcon,
    PencilIcon,
    ShareIcon,
    UserIcon,
    ChefHat
} from 'lucide-react';
import {toast} from 'sonner';
import {Timer} from "../components/Timer.tsx";


const RecipeDetail = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {currentRecipe, loading, error} = useSelector((state: RootState) => state.recipes);
    const {user, isAuthenticated} = useSelector((state: RootState) => state.auth);
    const {favorites} = useSelector((state: RootState) => state.favorites);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (currentRecipe && favorites) {
            setIsInFavorites(favorites.some(recipe => recipe.id === currentRecipe.id));
        }
    }, [currentRecipe, favorites]);

    const handleToggleFavorite = async () => {
        if (!isAuthenticated || !user || !currentRecipe) return;
        try {
            if (isInFavorites) {
                await dispatch(removeFromFavorites({userId: user.id, recipeId: currentRecipe.id}));
                toast.success('Removed from favorites');
            } else {
                await dispatch(addToFavorites({userId: user.id, recipeId: currentRecipe.id}));
                toast.success('Added to favorites');
            }
            setIsInFavorites(!isInFavorites);
        } catch (error) {
            toast.error('Failed to update favorites');
        }
    };

    const handleDelete = async () => {
        if (!currentRecipe) return;
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await dispatch(deleteRecipe(currentRecipe.id));
                toast.success('Recipe deleted successfully');
                navigate('/');
            } catch (error) {
                toast.error('Failed to delete recipe');
            }
        }
    };

    const handleShare = () => {
        if (navigator.share && currentRecipe) {
            navigator.share({
                title: currentRecipe.title,
                text: currentRecipe.description,
                url: window.location.href
            }).catch(error => console.log('Error sharing', error));
        } else {
            toast.success('Link copied to clipboard!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    if (loading) {
        return (
            <div
                className={`flex flex-col items-center justify-center min-h-[60vh] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div
                    className="animate-spin rounded-full h-16 w-16 border-4 border-[#B15E12]border-t-transparent mb-4"></div>
                <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                    Loading recipe...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`max-w-2xl mx-auto p-8 rounded-xl ${
                isDarkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'
            }`}>
                <div className="flex items-center justify-center">
                    <ChefHat className={`h-12 w-12 mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}/>
                </div>
                <p className={`text-center text-lg ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
                    Error loading recipe: {error}
                </p>
            </div>
        );
    }

    if (!currentRecipe) {
        return (
            <div className={`max-w-2xl mx-auto p-8 rounded-xl text-center ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
                <ChefHat className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}/>
                <h3 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Recipe not found
                </h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    The recipe you're looking for might have been moved or deleted
                </p>
            </div>
        );
    }

    const isOwner = isAuthenticated && user && user.id === currentRecipe.createdBy;

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className={`rounded-2xl overflow-hidden shadow-xl ${
                isDarkMode ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white'
            }`}>
                <div className="relative h-96">
                    <img
                        src={currentRecipe.imageUrl}
                        alt={currentRecipe.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                            {currentRecipe.title}
                        </h1>
                        <p className="text-gray-200 flex items-center text-lg">
                            <UserIcon className="h-5 w-5 mr-2"/>
                            Recipe by {currentRecipe.authorName}
                        </p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex flex-wrap gap-4">
                            <div className={`flex items-center px-4 py-2 rounded-full ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                                <ClockIcon className="h-5 w-5 mr-2 text-[#FF871A]"/>
                                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {currentRecipe.cookingTime} minutes
                </span>
                            </div>
                            <div className={`flex items-center px-4 py-2 rounded-full ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                                <UsersIcon className="h-5 w-5 mr-2 text-[#FF871A]"/>
                                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {currentRecipe.servings} servings
                </span>
                            </div>
                            <div className={`flex items-center px-4 py-2 rounded-full ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                                <StarIcon className="h-5 w-5 mr-2 text-amber-500 fill-current"/>
                                <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {currentRecipe.rating.toFixed(1)} rating
                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {isAuthenticated && (
                                <button
                                    onClick={handleToggleFavorite}
                                    className={`p-3 rounded-full transition-all duration-300 ${
                                        isInFavorites
                                            ? 'bg-red-500 text-white'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                                    }`}
                                    aria-label={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <HeartIcon className={`h-6 w-6 ${isInFavorites ? 'fill-current' : ''}`}/>
                                </button>
                            )}
                            <button
                                onClick={handleShare}
                                className={`p-3 rounded-full transition-all duration-300 ${
                                    isDarkMode
                                        ? 'bg-gray-700 text-gray-300 hover:bg-[#FF871A] hover:text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-[#FF871A] hover:text-white'
                                }`}
                                aria-label="Share recipe"
                            >
                                <ShareIcon className="h-6 w-6"/>
                            </button>
                            {isOwner && (
                                <>
                                    <button
                                        onClick={() => navigate(`/edit-recipe/${currentRecipe.id}`)}
                                        className={`p-3 rounded-full transition-all duration-300 ${
                                            isDarkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-[#FF871A] hover:text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-[#FF871A] hover:text-white'
                                        }`}
                                        aria-label="Edit recipe"
                                    >
                                        <PencilIcon className="h-6 w-6"/>
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className={`p-3 rounded-full transition-all duration-300 ${
                                            isDarkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                                        }`}
                                        aria-label="Delete recipe"
                                    >
                                        <TrashIcon className="h-6 w-6"/>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {currentRecipe.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {currentRecipe.dietaryInfo.map((info, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    isDarkMode
                                        ? 'bg-gray-700 text-gray-200'
                                        : 'bg-orange-50 text-[#B15E12]'
                                }`}
                            >
                {info}
              </span>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className={`p-6 rounded-xl ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                            <h2 className={`text-2xl font-semibold mb-6 ${
                                isDarkMode ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                                Ingredients
                            </h2>
                            <ul className="space-y-3">
                                {currentRecipe.ingredients.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                    >
                                        <span className="mr-3">•</span>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    Cooking Timer
                                </h3>
                                <Timer initialTime={currentRecipe.cookingTime}/>
                            </div>
                        </div>

                        <div className={`p-6 rounded-xl ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                            <h2 className={`text-2xl font-semibold mb-6 ${
                                isDarkMode ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                                Instructions
                            </h2>
                            <ol className="space-y-4">
                                {currentRecipe.instructions.map((instruction, index) => (
                                    <li
                                        key={index}
                                        className={`flex gap-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                    >
                    <span className={`flex-none w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-orange-100 text-[#FF871A]'
                    }`}>
                      {index + 1}
                    </span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;