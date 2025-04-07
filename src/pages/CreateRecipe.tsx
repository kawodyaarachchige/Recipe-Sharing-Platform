import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import { createRecipe } from '../redux/slices/recipeSlice';
import RecipeForm from '../components/recipes/RecipeForm';
import { Recipe } from '../types';
import { PlusCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
const CreateRecipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    loading
  } = useSelector((state: RootState) => state.recipes);
  const {
    user
  } = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    try {
      const completeRecipeData = {
        ...recipeData,
        createdBy: user?.id || '',
        authorName: user?.username || 'Unknown User'
      };
      const resultAction = await dispatch(createRecipe(completeRecipeData));
      const newRecipe = resultAction.payload as Recipe;
      toast.success('Recipe created successfully!');
      navigate(`/recipes/${newRecipe.id}`);
    } catch (error) {
      console.error('Failed to create recipe:', error);
      toast.error('Failed to create recipe');
    }
  };
  return <div className="max-w-3xl mx-auto">
      <RecipeForm onSubmit={handleSubmit} isSubmitting={loading} initialValues={{
      createdBy: user?.id || ''
    }} />
    </div>;
};
export default CreateRecipe;