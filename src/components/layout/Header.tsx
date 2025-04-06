import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { HomeIcon, BookOpenIcon, HeartIcon, UserIcon, LogOutIcon, LogInIcon, PlusCircleIcon} from 'lucide-react';
const Header = () => {
  const {
    isAuthenticated,
    user
  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return <header className={` 'bg-gray-800' : 'bg-teal-600'} text-white shadow-md`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <BookOpenIcon className="mr-2" />
            RecipeShare
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="flex items-center hover:text-teal-200 transition-colors">
              <HomeIcon className="mr-1 h-4 w-4" />
              Home
            </Link>
            {isAuthenticated && <>
                <Link to="/favorites" className="flex items-center hover:text-teal-200 transition-colors">
                  <HeartIcon className="mr-1 h-4 w-4" />
                  Favorites
                </Link>
                <Link to="/create-recipe" className="flex items-center hover:text-teal-200 transition-colors">
                  <PlusCircleIcon className="mr-1 h-4 w-4" />
                  Add Recipe
                </Link>
              </>}
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? <>
                <Link to="/profile" className="flex items-center hover:text-teal-200 transition-colors">
                  <UserIcon className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">{user?.username}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center hover:text-teal-200 transition-colors">
                  <LogOutIcon className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </> : <Link to="/login" className="flex items-center hover:text-teal-200 transition-colors">
                <LogInIcon className="mr-1 h-4 w-4" />
                Login
              </Link>}
          </div>
        </div>
      </div>
    </header>;
};
export default Header;