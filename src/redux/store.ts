import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import recipeReducer from './slices/recipeSlice';
import favoriteReducer from './slices/favoriteSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipeReducer,
        favorites: favoriteReducer,
        theme: themeReducer

    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;