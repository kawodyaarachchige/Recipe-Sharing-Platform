import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import { signup, clearError } from '../redux/slices/authSlice';
import { UserPlusIcon, AlertCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      const resultAction = await dispatch(signup({ username, email, password }));

      if (signup.fulfilled.match(resultAction)) {
        toast.success('Account created successfully!');
        navigate('/');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create account');
    }
  };
  const containerClasses = `max-w-md mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`;
  const cardClasses = `rounded-lg shadow-md p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
  const headingClasses = `text-2xl font-bold flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`;
  const subtextClasses = `mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  const errorClasses = `border-l-4 p-4 mb-6 flex items-start ${isDarkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-500 text-red-700'}`;
  const labelClasses = `block font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const inputClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`;
  const buttonClasses = `w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 ${isDarkMode ? 'focus:ring-offset-gray-800' : ''}`;
  const linkTextClasses = `text-gray-600 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  const linkClasses = `text-teal-600 hover:text-teal-800 font-medium ${isDarkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'}`;

  return (
      <div className={containerClasses}>
        <div className={cardClasses}>
          <div className="text-center mb-6">
            <h1 className={headingClasses}>
              <UserPlusIcon className="mr-2" />
              Sign Up
            </h1>
            <p className={subtextClasses}>Create your RecipeShare account</p>
          </div>

          {(error || formError) && (
              <div className={errorClasses}>
                <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <p>{error || formError}</p>
                  {error && (
                      <button
                          onClick={() => dispatch(clearError())}
                          className={`text-sm underline ${isDarkMode ? 'hover:text-red-300' : 'hover:text-red-800'}`}
                      >
                        Dismiss
                      </button>
                  )}
                </div>
              </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className={labelClasses}>
                Username
              </label>
              <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className={inputClasses}
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={inputClasses}
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className={labelClasses}>
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={inputClasses}
                  required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className={labelClasses}>
                Confirm Password
              </label>
              <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={inputClasses}
                  required
              />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={buttonClasses}
            >
              {loading ? (
                  <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                Creating account...
              </span>
              ) : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={linkTextClasses}>
              Already have an account?{' '}
              <Link to="/login" className={linkClasses}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};
export default Signup;