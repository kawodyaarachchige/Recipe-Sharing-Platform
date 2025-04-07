import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { login, clearError } from '../redux/slices/authSlice';
import { AlertCircleIcon, UtensilsCrossed, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ username, password }));
      if (login.fulfilled.match(resultAction)) {
        toast.success('Successfully logged in!');
        navigate('/');
      } else if (login.rejected.match(resultAction)) {
        toast.error('Failed to log in');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
  };

  const containerClasses = `h-screen-80 flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`;
  const cardClasses = `w-full max-w-[1200px] grid md:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
  const formSectionClasses = `p-8 lg:p-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
  const imageSectionClasses = `relative hidden md:block`;
  const inputWrapperClasses = `relative`;
  const inputClasses = `w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D96115] ${
      isDarkMode
          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
          : 'bg-gray-50 border-gray-200 placeholder-gray-400'
  }`;
  const inputIconClasses = `absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const buttonClasses = `w-full bg-[#D96115] hover:bg-[#B15E12] text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50`;
  const linkClasses = `text-[#D96115]hover:text-[#B15E12] font-medium transition-colors ${isDarkMode ? 'text-[#D96115] hover:text-[#B15E12]' : ''}`;

  return (
      <div className={containerClasses}>
        <div className={cardClasses}>
          <div className={formSectionClasses}>
            <div className="mb-8 flex items-center">
              <UtensilsCrossed className="h-8 w-8 text-[#D96115] mr-3" />
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Kitchen Library
              </h1>
            </div>

            <div className="mb-12">
              <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Welcome Back!
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Please enter your details to access your account
              </p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border-l-4 border-red-500 text-red-500">
                  <div className="flex items-start">
                    <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{error}</p>
                      <button
                          onClick={() => dispatch(clearError())}
                          className="text-sm underline hover:text-red-600"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className={inputWrapperClasses}>
                  <Mail className={inputIconClasses} size={20} />
                  <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className={inputClasses}
                      placeholder="Enter your username"
                      required
                  />
                </div>
              </div>

              <div>
                <div className={inputWrapperClasses}>
                  <Lock className={inputIconClasses} size={20} />
                  <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className={inputClasses}
                      placeholder="Enter your password"
                      required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                      type="checkbox"
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Remember me
                </span>
                </label>
                <Link to="/forgot-password" className={`${linkClasses} text-[#D96115] hover:text-[#a44910]`}>
                  Forgot password?
                </Link>
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className={`${buttonClasses} bg-[#D96115] hover:bg-[#a44910] text-white`}
              >
                {loading ? (
                    <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></span>
                  Logging in...
                </span>
                ) : 'Sign in'}
              </button>

              <p className="text-center text-sm mt-6">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Don't have an account?{' '}
              </span>
                <Link to="/signup" className={`${linkClasses} text-[#D96115] hover:text-[#a44910]`}>
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          <div className={imageSectionClasses}>
            <img
                src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?t=st=1743981026~exp=1743984626~hmac=9e644808bf52459f681b36d454ec6c3a7acf3dd4f089f1750193a09d93c2d6cf&w=2000"
                alt="Delicious food"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Craving Something?</h3>
                <p className="text-gray-200">Let's get you started with amazing recipes!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;