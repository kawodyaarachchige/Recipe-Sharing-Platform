import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
const AppContent = () => {
    const {
        isDarkMode
    } = useSelector((state: RootState) => state.theme);
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);
    return <Router>
        <div className={`flex flex-col min-h-screen   ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <Toaster position="top-right" richColors />
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                    <Route path="/create-recipe" element={<ProtectedRoute>
                        <CreateRecipe />
                    </ProtectedRoute>} />
                    <Route path="/edit-recipe/:id" element={<ProtectedRoute>
                        <EditRecipe />
                    </ProtectedRoute>} />
                    <Route path="/favorites" element={<ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    </Router>;
};
export function App() {
    return <Provider store={store}>
        <AppContent />
    </Provider>;
}