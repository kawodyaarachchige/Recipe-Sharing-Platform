import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { UserIcon, BookOpenIcon, HeartIcon, CalendarIcon } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { recipes } = useSelector((state: RootState) => state.recipes);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const userRecipes = recipes.filter(recipe => recipe.createdBy === user?.id);

  if (!user) {
    return (
        <div className={`text-center py-12 ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
          <h3 className="text-xl font-semibold">User not found</h3>
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-2xl overflow-hidden shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`px-8 py-12 ${
              isDarkMode ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-[#FF871A] to-[#BA1A1A]'
          }`}>
            <div className="flex items-center gap-6">
              <div className={`rounded-full p-4 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <UserIcon className={`h-12 w-12 ${
                    isDarkMode ? 'text-orange-400' : 'tex-orange-600'
                }`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.username}
                </h1>
                <p className={`${isDarkMode ? 'text-orange-200' : 'text-orange-100'}`}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={`rounded-xl p-6 ${
                  isDarkMode
                      ? 'bg-gray-700 border border-gray-600'
                      : 'bg-white border border-slate-200'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-3 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-teal-50'
                  }`}>
                    <BookOpenIcon className={`h-6 w-6 ${
                        isDarkMode ? 'text-orange-400' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      Created Recipes
                    </p>
                    <p className={`text-2xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      {userRecipes.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`rounded-xl p-6 ${
                  isDarkMode
                      ? 'bg-gray-700 border border-gray-600'
                      : 'bg-white border border-slate-200'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-3 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-red-50'
                  }`}>
                    <HeartIcon className={`h-6 w-6 ${
                        isDarkMode ? 'text-red-400' : 'text-red-500'
                    }`} />
                  </div>
                  <div>
                    <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      Favorite Recipes
                    </p>
                    <p className={`text-2xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      {favorites.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-6 ${
                isDarkMode
                    ? 'bg-gray-700 border border-gray-600'
                    : 'bg-white border border-slate-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <UserIcon className={`h-5 w-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-slate-400'
                  }`} />
                  <div>
                    <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      Username
                    </p>
                    <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      {user.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CalendarIcon className={`h-5 w-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-slate-400'
                  }`} />
                  <div>
                    <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      Member Since
                    </p>
                    <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      March 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;