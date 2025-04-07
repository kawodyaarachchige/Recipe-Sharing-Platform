import React, { useState } from 'react';
import { Recipe } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store.ts";
import { ChefHat, Clock, Users, ChevronDown, Plus, X, Utensils } from 'lucide-react';

interface RecipeFormProps {
  initialValues?: Partial<Recipe>;
  onSubmit: (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => void;
  isSubmitting: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
                                                 initialValues = {},
                                                 onSubmit,
                                                 isSubmitting
                                               }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [cookingTime, setCookingTime] = useState(initialValues.cookingTime || 30);
  const [servings, setServings] = useState(initialValues.servings || 2);
  const [difficulty, setDifficulty] = useState(initialValues.difficulty || 'Medium');
  const [imageUrl, setImageUrl] = useState(initialValues.imageUrl || '');
  const [ingredients, setIngredients] = useState<string[]>(initialValues.ingredients || ['']);
  const [instructions, setInstructions] = useState<string[]>(initialValues.instructions || ['']);
  const [dietaryInfo, setDietaryInfo] = useState<string[]>(initialValues.dietaryInfo || []);

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const dietaryOptions = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'low-carb', 'keto', 'paleo', 'contains dairy', 'contains eggs', 'contains nuts'];

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleDietaryToggle = (option: string) => {
    if (dietaryInfo.includes(option)) {
      setDietaryInfo(dietaryInfo.filter(item => item !== option));
    } else {
      setDietaryInfo([...dietaryInfo, option]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredIngredients = ingredients.filter(item => item.trim() !== '');
    const filteredInstructions = instructions.filter(item => item.trim() !== '');
    onSubmit({
      title,
      description,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      cookingTime,
      servings,
      difficulty,
      imageUrl,
      rating: initialValues.rating || 0,
      dietaryInfo,
      createdBy: initialValues.createdBy || ''
    });
  };

  return (
      <div className={`max-w-4xl mx-auto py-8 px-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        <div className="flex items-center justify-center mb-8 space-x-3">
          <ChefHat className={`h-10 w-10 ${isDarkMode ? 'text-[#FF871A]' : 'text-[#BC6C25]'}`} />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {initialValues.id ? 'Edit Recipe' : 'Create New Recipe'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Card */}
          <div className={`rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            <div className={`px-6 py-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Basic Information
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="block">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Recipe Title*
                </span>
                  <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className={`mt-1 block w-full px-4 py-3 rounded-xl border transition duration-150 ease-in-out focus:ring-2 ${
                          isDarkMode
                              ? 'bg-gray-700 border-gray-600 focus:border-[#FF871A] focus:ring-[#FF871A]/20'
                              : 'bg-white border-gray-300 focus:border-[#BC6C25] focus:ring-[#BC6C25]/20'
                      }`}
                      placeholder="Enter your recipe title"
                      required
                  />
                </label>

                <label className="block">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description*
                </span>
                  <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={3}
                      className={`mt-1 block w-full px-4 py-3 rounded-xl border transition duration-150 ease-in-out focus:ring-2 ${
                          isDarkMode
                              ? 'bg-gray-700 border-gray-600 focus:border-[#FF871A] focus:ring-[#FF871A]/20'
                              : 'bg-white border-gray-300 focus:border-[#BC6C25] focus:ring-[#BC6C25]/20'
                      }`}
                      placeholder="Describe your recipe"
                      required
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Image URL*
                  </span>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        className={`mt-1 block w-full px-4 py-3 rounded-xl border transition duration-150 ease-in-out focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 focus:border-[#FF871A] focus:ring-[#FF871A]/20'
                                : 'bg-white border-gray-300 focus:border-[#BC6C25] focus:ring-[#BC6C25]/20'
                        }`}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                  </label>

                  <label className="block">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Difficulty Level*
                  </span>
                    <div className="relative mt-1">
                      <select
                          value={difficulty}
                          onChange={e => setDifficulty(e.target.value)}
                          className={`block w-full px-4 py-3 rounded-xl border appearance-none transition duration-150 ease-in-out focus:ring-2 ${
                              isDarkMode
                                  ? 'bg-gray-700 border-gray-600 focus:border-[#FF871A] focus:ring-[#FF871A]/20'
                                  : 'bg-white border-gray-300 focus:border-[#BC6C25] focus:ring-[#BC6C25]/20'
                          }`}
                          required
                      >
                        {difficultyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none" />
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Clock className="inline-block h-4 w-4 mr-1" />
                    Cooking Time (minutes)*
                  </span>
                    <input
                        type="number"
                        value={cookingTime}
                        onChange={e => setCookingTime(parseInt(e.target.value))}
                        min="1"
                        className={`mt-1 block w-full px-4 py-3 rounded-xl border transition duration-150 ease-in-out focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 focus:border-[#FF871A] focus:ring-[#FF871A]/20'
                                : 'bg-white border-gray-300 focus:border-[#BC6C25] focus:ring-[#BC6C25]/20'
                        }`}
                        required
                    />
                  </label>

                  <label className="block">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Users className="inline-block h-4 w-4 mr-1" />
                    Servings*
                  </span>
                    <input
                        type="number"
                        value={servings}
                        onChange={e => setServings(parseInt(e.target.value))}
                        min="1"
                        className={`mt-1 block w-full px-4 py-3 rounded-xl border transition duration-150 ease-in-out focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 focus:border-[#FF871A] focus:ring-[#FF871A]/20'
                                : 'bg-white border-gray-300 focus:border-[#BC6C25] focus:ring-[#BC6C25]/20'
                        }`}
                        required
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients Card */}
          <div className={`rounded-2xl shadow-lg overflow-hidden ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            <div className={`px-6 py-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold">Ingredients*</h2>
            </div>

            <div className="p-6 space-y-4">
              {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <input
                        type="text"
                        value={ingredient}
                        onChange={e => handleIngredientChange(index, e.target.value)}
                        placeholder={`Ingredient ${index + 1}`}
                        className={`flex-1 px-4 py-3 rounded-xl border transition duration-150 ease-in-out focus:ring-2 ${
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 focus:border-[#FF871A] focus:ring-[#FF871A]/20'
                                : 'bg-white border-gray-300 focus:border-[#BC6C25] focus:ring-[#BC6C25]/20'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        className={`p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                            isDarkMode ? 'hover:bg-red-500/20' : 'hover:bg-red-100'
                        }`}
                        disabled={ingredients.length <= 1}
                    >
                      <X className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                    </button>
                  </div>
              ))}

              <button
                  type="button"
                  onClick={handleAddIngredient}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      isDarkMode
                          ? 'text-[#FF871A] hover:bg-[#FF871A]/10'
                          : 'text-[#BC6C25] hover:bg-[#BC6C25]/10'
                  }`}
              >
                <Plus className="h-4 w-4" />
                Add Ingredient
              </button>
            </div>
          </div>

          {/* Instructions Card */}
          <div className={`rounded-2xl shadow-lg overflow-hidden ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            <div className={`px-6 py-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold">Instructions*</h2>
            </div>

            <div className="p-6 space-y-4">
              {instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                <span className={`flex-none pt-3 font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {index + 1}.
                </span>
                    <div className="flex-1">
                  <textarea
                      value={instruction}
                      onChange={e => handleInstructionChange(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      rows={2}
                      className={`w-full px-4 py-3 rounded-xl border transition duration-150 ease-in-out focus:ring-2 ${
                          isDarkMode
                              ? 'bg-gray-700 border-gray-600 focus:border-[#FF871A] focus:ring-[#FF871A]/20'
                              : 'bg-white border-gray-300 focus:border-[#BC6C25] focus:ring-[#BC6C25]/20'
                      }`}
                  />
                    </div>
                    <button
                        type="button"
                        onClick={() => handleRemoveInstruction(index)}
                        className={`p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                            isDarkMode ? 'hover:bg-red-500/20' : 'hover:bg-red-100'
                        }`}
                        disabled={instructions.length <= 1}
                    >
                      <X className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                    </button>
                  </div>
              ))}

              <button
                  type="button"
                  onClick={handleAddInstruction}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      isDarkMode
                          ? 'text-[#FF871A] hover:bg-[#FF871A]/10'
                          : 'text-[#BC6C25] hover:bg-[#BC6C25]/10'
                  }`}
              >
                <Plus className="h-4 w-4" />
                Add Step
              </button>
            </div>
          </div>

          {/* Dietary Information Card */}
          <div className={`rounded-2xl shadow-lg overflow-hidden ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            <div className={`px-6 py-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold">Dietary Information</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dietaryOptions.map(option => (
                    <label
                        key={option}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                            dietaryInfo.includes(option)
                                ? isDarkMode
                                    ? 'bg-[#FF871A]/20 text-[#FF871A]'
                                    : 'bg-[#BC6C25]/20 text-[#BC6C25]'
                                : isDarkMode
                                    ? 'hover:bg-gray-700/50'
                                    : 'hover:bg-gray-100'
                        }`}
                    >
                      <input
                          type="checkbox"
                          checked={dietaryInfo.includes(option)}
                          onChange={() => handleDietaryToggle(option)}
                          className="sr-only"
                      />
                      <div
                          className={`w-5 h-5 flex items-center justify-center rounded border ${
                              dietaryInfo.includes(option)
                                  ? isDarkMode
                                      ? 'border-[#FF871A] bg-[#FF871A]'
                                      : 'border-[#BC6C25] bg-[#BC6C25]'
                                  : isDarkMode
                                      ? 'border-gray-600'
                                      : 'border-gray-300'
                          }`}
                      >
                        {dietaryInfo.includes(option) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                      </div>
                      <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                    {option}
                  </span>
                    </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDarkMode
                        ? 'bg-[#FF871A] hover:bg-[#FF871A]/90 text-white focus:ring-[#FF871A]'
                        : 'bg-[#BC6C25] hover:bg-[#BC6C25]/90 text-white focus:ring-[#BC6C25]'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {isSubmitting ? (
                  <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                  />
                  <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
              ) : (
                  initialValues.id ? 'Update Recipe' : 'Create Recipe'
              )}
            </button>
          </div>
        </form>
      </div>
  );
};

export default RecipeForm;