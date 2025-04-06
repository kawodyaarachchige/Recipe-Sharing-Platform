import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { fetchFavorites } from '../redux/slices/favoriteSlice'
import RecipeList from '../components/recipes/RecipeList'
import { HeartIcon } from 'lucide-react'
const Favorites = () => {
  const dispatch = useDispatch()
  const { favorites, loading, error } = useSelector(
      (state: RootState) => state.favorites,
  )
  const { user } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.id))
    }
  }, [dispatch, user])
  return (
      <div className="dark:bg-gray-900">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center">
            <HeartIcon className="mr-2 text-red-500" />
            Your Favorite Recipes
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            All your saved recipes in one place
          </p>
        </div>
        <RecipeList recipes={favorites} loading={loading} error={error} />
      </div>
  )
}
export default Favorites
