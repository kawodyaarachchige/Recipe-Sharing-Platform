import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import { fetchRecipeById, deleteRecipe } from '../redux/slices/recipeSlice';
import { addToFavorites, removeFromFavorites } from '../redux/slices/favoriteSlice';
import { ClockIcon, UsersIcon, StarIcon, HeartIcon, TrashIcon, PencilIcon, ShareIcon } from 'lucide-react';
import { toast } from 'sonner';
import { UserIcon } from 'lucide-react';
const RecipeDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentRecipe, loading, error } = useSelector((state: RootState) => state.recipes);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { favorites } = useSelector((state: RootState) => state.favorites);
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
        await dispatch(removeFromFavorites({
          userId: user.id,
          recipeId: currentRecipe.id
        }));
        toast.success('Removed from favorites');
      } else {
        await dispatch(addToFavorites({
          userId: user.id,
          recipeId: currentRecipe.id
        }));
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
      alert('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };
  const loadingContainerClasses = `flex justify-center items-center h-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
  const errorClasses = `${isDarkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded`;
  const notFoundClasses = `text-center py-8 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`;

  const containerClasses = `max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`;
  const cardClasses = `${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`;
  const textClasses = `${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`;
  const titleClasses = `text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`;
  const metaTextClasses = `${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  const sectionTitleClasses = `text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`;
  const listItemClasses = `${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const tagClasses = `${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'} text-xs px-2 py-1 rounded-full mr-2 mb-2`;

  const baseButtonClasses = "p-2 rounded-full transition-colors";
  const favoriteButtonClasses = `${baseButtonClasses} ${isInFavorites
      ? 'bg-red-100 text-red-500'
      : isDarkMode
          ? 'bg-gray-700 text-gray-300 hover:bg-red-100 hover:text-red-500'
          : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500'}`;
  const shareButtonClasses = `${baseButtonClasses} ${isDarkMode
      ? 'bg-gray-700 text-gray-300 hover:bg-blue-100 hover:text-blue-500'
      : 'bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-500'}`;
  const editButtonClasses = `${baseButtonClasses} ${isDarkMode
      ? 'bg-gray-700 text-gray-300 hover:bg-teal-100 hover:text-teal-500'
      : 'bg-gray-100 text-gray-500 hover:bg-teal-100 hover:text-teal-500'}`;
  const deleteButtonClasses = `${baseButtonClasses} ${isDarkMode
      ? 'bg-gray-700 text-gray-300 hover:bg-red-100 hover:text-red-500'
      : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500'}`;

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
          <p>Error loading recipe: {error}</p>
        </div>
    );
  }

  if (!currentRecipe) {
    return (
        <div className={notFoundClasses}>
          <h3 className="text-xl font-semibold">
            Recipe not found
          </h3>
        </div>
    );
  }

  const isOwner = isAuthenticated && user && user.id === currentRecipe.createdBy;

  return (
      <div className={containerClasses}>
        <div className={cardClasses}>
          <div className="h-80 overflow-hidden">
            <img src={currentRecipe.imageUrl} alt={currentRecipe.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className={titleClasses}>
                  {currentRecipe.title}
                </h1>
                <p className={`${metaTextClasses} mt-2 flex items-center`}>
                  <UserIcon className="h-4 w-4 mr-1" />
                  Recipe by {currentRecipe.authorName}
                </p>
              </div>
              <div className="flex space-x-2">
                {isAuthenticated && (
                    <button
                        onClick={handleToggleFavorite}
                        className={favoriteButtonClasses}
                        aria-label={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <HeartIcon className={`h-5 w-5 ${isInFavorites ? 'fill-current' : ''}`} />
                    </button>
                )}
                <button
                    onClick={handleShare}
                    className={shareButtonClasses}
                    aria-label="Share recipe"
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
                {isOwner && (
                    <>
                      <button
                          onClick={() => navigate(`/edit-recipe/${currentRecipe.id}`)}
                          className={editButtonClasses}
                          aria-label="Edit recipe"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                          onClick={handleDelete}
                          className={deleteButtonClasses}
                          aria-label="Delete recipe"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </>
                )}
              </div>
            </div>

            <p className={textClasses}>{currentRecipe.description}</p>

            <div className={`flex flex-wrap items-center mt-4 ${metaTextClasses}`}>
              <div className="flex items-center mr-6 mb-2">
                <ClockIcon className="h-5 w-5 mr-1 text-teal-500" />
                <span>{currentRecipe.cookingTime} minutes</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <UsersIcon className="h-5 w-5 mr-1 text-teal-500" />
                <span>{currentRecipe.servings} servings</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <StarIcon className="h-5 w-5 mr-1 text-amber-500 fill-current" />
                <span>{currentRecipe.rating.toFixed(1)}</span>
              </div>
              <div className="flex flex-wrap">
                {currentRecipe.dietaryInfo.map((info, index) => (
                    <span key={index} className={tagClasses}>
                  {info}
                </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className={sectionTitleClasses}>
                Ingredients
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {currentRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className={listItemClasses}>
                      {ingredient}
                    </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className={sectionTitleClasses}>
                Instructions
              </h2>
              <ol className="list-decimal pl-5 space-y-4">
                {currentRecipe.instructions.map((instruction, index) => (
                    <li key={index} className={listItemClasses}>
                      {instruction}
                    </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
  );
};
export default RecipeDetail;