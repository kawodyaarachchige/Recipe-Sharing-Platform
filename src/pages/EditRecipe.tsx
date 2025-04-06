import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRecipeById, updateRecipe, clearCurrentRecipe } from '../redux/slices/recipeSlice';
import RecipeForm from '../components/recipes/RecipeForm';
import { Recipe } from '../types';
import { PencilIcon } from 'lucide-react';
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
        <div className={`flex justify-center items-center h-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
    );
  }

  if (error) {
    return (
        <div className={`${isDarkMode ? 'bg-red-900 text-red-200 border-red-700' : 'bg-red-100 text-red-700 border-red-400'} border px-4 py-3 rounded`}>
          <p>Error loading recipe: {error}</p>
        </div>
    );
  }

  if (!currentRecipe) {
    return (
        <div className={`text-center py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Recipe not found
          </h3>
        </div>
    );
  }

  const containerClasses = `max-w-3xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
  const headingClasses = `text-3xl font-bold flex items-center justify-center ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`;
  const subtextClasses = `mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  return (
      <div className={containerClasses}>
        <div className="text-center mb-8 pt-6">
          <h1 className={headingClasses}>
            <PencilIcon className="mr-2" />
            Edit Recipe
          </h1>
          <p className={subtextClasses}>Update your recipe details</p>
        </div>
        <RecipeForm initialValues={currentRecipe} onSubmit={handleSubmit} isSubmitting={loading} />
      </div>
  );
};

export default EditRecipe;