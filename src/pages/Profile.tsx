import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { UserIcon } from 'lucide-react';
const Profile = () => {
  const {
    user
  } = useSelector((state: RootState) => state.auth);
  const {
    favorites
  } = useSelector((state: RootState) => state.favorites);
  const {
    recipes
  } = useSelector((state: RootState) => state.recipes);
  const userRecipes = recipes.filter(recipe => recipe.createdBy === user?.id);
  if (!user) {
    return <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-gray-600">User not found</h3>
      </div>;
  }
  return <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-teal-600 px-6 py-8">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4">
              <UserIcon className="h-12 w-12 text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.username}</h1>
              <p className="text-teal-100">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-teal-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-teal-800">
                Created Recipes
              </h3>
              <p className="text-3xl font-bold text-teal-600">
                {userRecipes.length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-800">
                Favorite Recipes
              </h3>
              <p className="text-3xl font-bold text-red-500">
                {favorites.length}
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-gray-800">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-gray-800">January 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;