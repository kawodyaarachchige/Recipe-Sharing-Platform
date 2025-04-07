import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRecipeById, updateRecipe, clearCurrentRecipe } from '../redux/slices/recipeSlice';
import RecipeForm from '../components/recipes/RecipeForm';
import { Recipe } from '../types';
import { PencilIcon, ChefHat, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentRecipe, loading, error } = useSelector((state: RootState) => state.recipes);
  const { user } = useSelector((state: RootState) => state.auth);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
    return () => {
      dispatch(clearCurrentRecipe());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentRecipe && user && currentRecipe.createdBy !== user.id) {
      navigate('/recipes/' + id);
    }
  }, [currentRecipe, user, navigate, id]);

  const handleSubmit = async (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    if (!currentRecipe) return;
    try {
      const updatedRecipeData = {
        ...recipeData,
        id: currentRecipe.id,
        createdAt: currentRecipe.createdAt,
        authorName: user?.username || 'Unknown User'
      };
      await dispatch(updateRecipe(updatedRecipeData));
      toast.success('Recipe updated successfully!');
      navigate(`/recipes/${currentRecipe.id}`);
    } catch (error) {
      console.error('Failed to update recipe:', error);
      toast.error('Failed to update recipe');
    }
  };

  if (loading) {
    return (
        <div className={`min-h-[70vh] flex flex-col items-center justify-center ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="relative">
            <Loader2 className={`h-12 w-12 animate-spin ${
                isDarkMode ? 'text-[#FF871A]' : 'text-[#BC6C25]'
            }`} />
            <div className={`mt-4 text-lg font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Loading recipe...
            </div>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className={`min-h-[70vh] flex flex-col items-center justify-center ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className={`max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg ${
              isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className={`h-12 w-12 ${
                  isDarkMode ? 'text-red-400' : 'text-red-500'
              }`} />
            </div>
            <h3 className={`text-xl font-semibold text-center mb-2 ${
                isDarkMode ? 'text-red-400' : 'text-red-700'
            }`}>
              Error Loading Recipe
            </h3>
            <p className={`text-center mb-6 ${
                isDarkMode ? 'text-red-300' : 'text-red-600'
            }`}>
              {error}
            </p>
            <button
                onClick={() => navigate('/recipes')}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isDarkMode
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Recipes
            </button>
          </div>
        </div>
    );
  }

  if (!currentRecipe) {
    return (
        <div className={`min-h-[70vh] flex flex-col items-center justify-center ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className={`max-w-md w-full mx-auto p-6 rounded-2xl shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-center mb-4">
              <ChefHat className={`h-12 w-12 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            <h3 className={`text-xl font-semibold text-center mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Recipe Not Found
            </h3>
            <p className={`text-center mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <button
                onClick={() => navigate('/recipes')}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Recipes
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className={`min-h-screen py-8 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate(`/recipes/${id}`)}
                className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isDarkMode
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Recipe
            </button>
            <RecipeForm
                initialValues={currentRecipe}
                onSubmit={handleSubmit}
                isSubmitting={loading}
            />
          </div>
        </div>
      </div>
  );
};

export default EditRecipe;