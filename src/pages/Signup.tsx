import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { signup, clearError } from '../redux/slices/authSlice';
import { AlertCircleIcon, UtensilsCrossed, Mail, Lock, User } from 'lucide-react';
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

  const containerClasses = `min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`;
  const cardClasses = `w-full max-w-[1200px] grid md:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
  const formSectionClasses = `p-8 lg:p-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`;
  const imageSectionClasses = `relative hidden md:block`;
  const inputWrapperClasses = `relative`;
  const inputClasses = `w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
      isDarkMode
          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
          : 'bg-gray-50 border-gray-200 placeholder-gray-400'
  }`;
  const inputIconClasses = `absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const buttonClasses = `w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50`;
  const linkClasses = `text-teal-600 hover:text-teal-500 font-medium transition-colors ${isDarkMode ? 'text-teal-400 hover:text-teal-300' : ''}`;

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
                Create Account
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join our community of food lovers
              </p>
            </div>

            {(error || formError) && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border-l-4 border-red-500 text-red-500">
                  <div className="flex items-start">
                    <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{error || formError}</p>
                      {error && (
                          <button
                              onClick={() => dispatch(clearError())}
                              className="text-sm underline hover:text-red-600"
                          >
                            Dismiss
                          </button>
                      )}
                    </div>
                  </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className={inputWrapperClasses}>
                  <User className={inputIconClasses} size={20}/>
                  <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className={inputClasses}
                      placeholder="Choose a username"
                      required
                  />
                </div>
              </div>

              <div>
                <div className={inputWrapperClasses}>
                  <Mail className={inputIconClasses} size={20}/>
                  <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={inputClasses}
                      placeholder="Enter your email"
                      required
                  />
                </div>
              </div>

              <div>
                <div className={inputWrapperClasses}>
                  <Lock className={inputIconClasses} size={20}/>
                  <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className={inputClasses}
                      placeholder="Create a password"
                      required
                  />
                </div>
              </div>

              <div>
                <div className={inputWrapperClasses}>
                  <Lock className={inputIconClasses} size={20}/>
                  <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className={inputClasses}
                      placeholder="Confirm your password"
                      required
                  />
                </div>
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className={`${buttonClasses} bg-[#D96115] hover:bg-[#a44910] text-white`}
              >
                {loading ? (
                    <span className="flex items-center justify-center">
      <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></span>
      Creating account...
    </span>
                ) : 'Create Account'}
              </button>

              <p className="text-center text-sm mt-6">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Already have an account?{' '}
              </span>
                <Link to="/login" className={`${linkClasses} text-[#D96115] hover:text-[#a44910]`}>
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          <div className={imageSectionClasses}>
            <img
                src="https://img.freepik.com/free-vector/cartoon-recipe-note-with-food_52683-73978.jpg?t=st=1743980658~exp=1743984258~hmac=0e1d1865d0168aecda608dfe5cc23a390e39fd6107aba21db16ebd061031dca4&w=2000"
                alt="Cooking preparation"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Start Your Culinary Journey</h3>
                <p className="text-gray-200">Share and discover amazing recipes!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Signup;