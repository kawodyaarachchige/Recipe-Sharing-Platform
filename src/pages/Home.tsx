import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRecipes } from '../redux/slices/recipeSlice';
import RecipeList from '../components/recipes/RecipeList';
import SearchBar from '../components/recipes/SearchBar';
import { ChefHat, UtensilsCrossed, Flame, Clock, Users, Trophy } from 'lucide-react';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredRecipes, loading, error } = useSelector((state: RootState) => state.recipes);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const features = [
        {
            icon: <Flame className="h-6 w-6" />,
            title: "Quick & Easy",
            description: "Find recipes that fit your schedule"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Time-Saving",
            description: "Efficient meal planning and prep"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Community-Driven",
            description: "Share and discover family favorites"
        },
        {
            icon: <Trophy className="h-6 w-6" />,
            title: "Curated Collection",
            description: "Hand-picked recipes by experts"
        }
    ];

    return (
        <div className={isDarkMode ? 'text-white' : 'text-slate-800'}>
            {/* Hero Section */}
            <div className="relative overflow-hidden mb-16">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80"
                        alt="Kitchen Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/70' : 'bg-white/70'}`} />
                </div>

                <div className="relative z-10 text-center py-20">
                    <div className="inline-flex items-center justify-center space-x-3 mb-6">
                        <ChefHat className={`h-12 w-12 ${isDarkMode ? 'text-[#B15E12]' : 'text-[#D96115]'}`} />
                        <UtensilsCrossed className={`h-8 w-8 ${isDarkMode ? 'text-[#B15E12]' : 'text-[#D96115]'}`} />
                    </div>

                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-500">
                        Welcome to Kitchen Library
                    </h1>

                    <p className={`text-xl max-w-2xl mx-auto mb-8 ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-600'
                    }`}>
                        Discover, create, and share your favorite recipes with our community of food lovers
                    </p>

                    <div className="max-w-3xl mx-auto">
                        <SearchBar showFilters={true} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 mb-16">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-xl ${
                            isDarkMode
                                ? 'bg-gray-800 hover:bg-gray-700'
                                : 'bg-white hover:bg-gray-50'
                        } transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                        <div className={`${
                            isDarkMode ? 'text-[#B15E12]' : 'text-[#D96115]'
                        } mb-4`}>
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className={`${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
            <div className="max-w-7xl mx-auto px-4">
                <RecipeList
                    recipes={filteredRecipes}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};

export default Home;