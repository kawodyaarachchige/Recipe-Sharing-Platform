import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';
import {
  HomeIcon,
  HeartIcon,
  UserIcon,
  LogOutIcon,
  LogInIcon,
  PlusCircleIcon,
  MoonIcon,
  SunIcon,
  ChefHat
} from 'lucide-react';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navLinkClasses = `flex items-center px-4 py-2 rounded-full transition-all hover:bg-opacity-10 ${
      isDarkMode ? 'hover:bg-[#D96115] text-white' : 'hover:bg-[#D96115] text-black'
  }`;

  const buttonClasses = `flex items-center px-4 py-2 rounded-full transition-all ${
      isDarkMode
          ? 'hover:bg-[#D96115] hover:bg-opacity-10 text-white'
          : 'hover:bg-[#D96115] text-black'
  }`;

  return (
      <header className={`sticky top-0 z-50 backdrop-blur-lg backdrop-saturate-150 ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } shadow-sm`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <ChefHat className={`mr-2 ${isDarkMode ? 'text-[#D96115]' : 'text-[#BB5312]'}`} />
              <span className={isDarkMode ? 'text-[#D96115]' : 'text-[#BB5312]'}>KitchenLibrary</span>
            </Link>
            <nav className="hidden md:flex space-x-2">
              <Link to="/" className={navLinkClasses}>
                <HomeIcon className="mr-1 h-4 w-4" />
                Home
              </Link>
              {isAuthenticated && (
                  <>
                    <Link to="/favorites" className={navLinkClasses}>
                      <HeartIcon className="mr-1 h-4 w-4" />
                      Favorites
                    </Link>
                    <Link to="/create-recipe" className={navLinkClasses}>
                      <PlusCircleIcon className="mr-1 h-4 w-4" />
                      Add Recipe
                    </Link>
                  </>
              )}
            </nav>

            <div className="flex items-center space-x-2">
              <button
                  onClick={() => dispatch(toggleTheme())}
                  className={`p-2 rounded-full transition-all ${
                      isDarkMode
                          ? 'hover:bg-[#D96115] hover:bg-opacity-10 text-white'
                          : 'hover:bg-[#D96115] text-black'
                  }`}
                  aria-label="Toggle theme"
              >
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>

              {isAuthenticated ? (
                  <>
                    <Link to="/profile" className={buttonClasses}>
                      <UserIcon className="mr-1 h-4 w-4" />
                      <span className="hidden md:inline">{user?.username}</span>
                    </Link>
                    <button onClick={handleLogout} className={buttonClasses}>
                      <LogOutIcon className="mr-1 h-4 w-4" />
                      <span className="hidden md:inline">Logout</span>
                    </button>
                  </>
              ) : (
                  <Link to="/login" className={buttonClasses}>
                    <LogInIcon className="mr-1 h-4 w-4" />
                    <span>Login</span>
                  </Link>
              )}
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;