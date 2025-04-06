import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import { login, clearError } from '../redux/slices/authSlice';
import { LogInIcon, AlertCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {
    loading,
    error
  } = useSelector((state: RootState) => state.auth);
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
  return <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
            <LogInIcon className="mr-2" />
            Log In
          </h1>
          <p className="text-gray-600 mt-2">Welcome back to RecipeShare</p>
        </div>
        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 flex items-start">
            <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5" />
            <div>
              <p>{error}</p>
              <button onClick={() => dispatch(clearError())} className="text-sm underline hover:text-red-800">
                Dismiss
              </button>
            </div>
          </div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50">
            {loading ? <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                Logging in...
              </span> : 'Log In'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-600 hover:text-teal-800 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>;
};
export default Login;