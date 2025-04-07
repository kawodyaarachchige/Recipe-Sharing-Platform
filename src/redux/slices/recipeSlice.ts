import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockApi } from '../../api/mockApi';
import { Recipe } from '../../types';
interface RecipeState {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  currentRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;

}
const initialState: RecipeState = {
  recipes: [],
  filteredRecipes: [],
  currentRecipe: null,
  loading: false,
  error: null,
  searchTerm: ''
};
export const fetchRecipes = createAsyncThunk('recipes/fetchAll', async (_, {
  rejectWithValue
}) => {
  try {
    return await mockApi.getRecipes();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
export const fetchRecipeById = createAsyncThunk('recipes/fetchById', async (id: string, {
  rejectWithValue
}) => {
  try {
    return await mockApi.getRecipeById(id);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
export const createRecipe = createAsyncThunk('recipes/create', async (recipeData: Omit<Recipe, 'id'>, {
  rejectWithValue
}) => {
  try {
    return await mockApi.createRecipe(recipeData);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
export const updateRecipe = createAsyncThunk('recipes/update', async (recipeData: Recipe, {
  rejectWithValue
}) => {
  try {
    return await mockApi.updateRecipe(recipeData);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
export const deleteRecipe = createAsyncThunk('recipes/delete', async (id: string, {
  rejectWithValue
}) => {
  try {
    await mockApi.deleteRecipe(id);
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredRecipes = state.recipes.filter(recipe => recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(state.searchTerm.toLowerCase())));
    },
    clearCurrentRecipe: state => {
      state.currentRecipe = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchRecipes.pending, state => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
      state.filteredRecipes = action.payload;
    }).addCase(fetchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    }).addCase(fetchRecipeById.pending, state => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchRecipeById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentRecipe = action.payload;
    }).addCase(fetchRecipeById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    }).addCase(createRecipe.fulfilled, (state, action) => {
      state.recipes.push(action.payload);
      state.filteredRecipes = state.recipes.filter(recipe => recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(state.searchTerm.toLowerCase())));
    }).addCase(updateRecipe.fulfilled, (state, action) => {
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
        state.filteredRecipes = state.recipes.filter(recipe => recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(state.searchTerm.toLowerCase())));
      }
      if (state.currentRecipe?.id === action.payload.id) {
        state.currentRecipe = action.payload;
      }
    }).addCase(deleteRecipe.fulfilled, (state, action) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
      state.filteredRecipes = state.filteredRecipes.filter(recipe => recipe.id !== action.payload);
      if (state.currentRecipe?.id === action.payload) {
        state.currentRecipe = null;
      }
    });
  }
});
export const {
  setSearchTerm,
  clearCurrentRecipe
} = recipeSlice.actions;
export default recipeSlice.reducer;