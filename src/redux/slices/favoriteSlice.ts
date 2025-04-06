import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockApi } from '../../api/mockApi'
import { Recipe } from '../../types'

interface FavoriteState {
  favorites: Recipe[]
  loading: boolean
  error: string | null
}

const initialState: FavoriteState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  loading: false,
  error: null,
}

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchAll',
    async (userId: string, { rejectWithValue }) => {
      try {
        const favorites = await mockApi.getFavorites(userId)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        return favorites
      } catch (error) {
        return rejectWithValue((error as Error).message)
      }
    }
)

export const addToFavorites = createAsyncThunk(
    'favorites/add',
    async ({ userId, recipeId }: { userId: string; recipeId: string }, { dispatch, rejectWithValue }) => {
      try {
        const recipe = await mockApi.addToFavorites(userId, recipeId)
        const favorites = await mockApi.getFavorites(userId)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        return favorites
      } catch (error) {
        return rejectWithValue((error as Error).message)
      }
    }
)

export const removeFromFavorites = createAsyncThunk(
    'favorites/remove',
    async ({ userId, recipeId }: { userId: string; recipeId: string }, { dispatch, rejectWithValue }) => {
      try {
        await mockApi.removeFromFavorites(userId, recipeId)
        const favorites = await mockApi.getFavorites(userId)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        return favorites
      } catch (error) {
        return rejectWithValue((error as Error).message)
      }
    }
)

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchFavorites.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchFavorites.fulfilled, (state, action) => {
          state.loading = false
          state.favorites = action.payload
        })
        .addCase(fetchFavorites.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload as string
        })
        .addCase(addToFavorites.fulfilled, (state, action) => {
          state.favorites = action.payload
        })
        .addCase(removeFromFavorites.fulfilled, (state, action) => {
          state.favorites = action.payload
        })
  },
})

export default favoriteSlice.reducer