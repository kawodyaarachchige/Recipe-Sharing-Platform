import React, { useState } from 'react';
import { Recipe } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store.ts";

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

  const formClasses = `max-w-4xl mx-auto rounded-xl shadow-lg p-8 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`;
  const inputClasses = `w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 placeholder-gray-400'}`;
  const labelClasses = `block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const buttonClasses = `font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 ${isDarkMode ? 'bg-teal-600 hover:bg-teal-500 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`;
  const addButtonClasses = `inline-flex items-center text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'}`;
  const removeButtonClasses = `ml-2 p-2 rounded-full transition-colors duration-200 ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' : 'text-red-500 hover:text-red-600 hover:bg-red-100'}`;
  const checkboxClasses = `h-5 w-5 rounded transition-all duration-200 ${isDarkMode ? 'border-gray-500 bg-gray-700' : 'border-gray-300 bg-gray-50'} text-teal-600 focus:ring-teal-500`;
  const stepNumberClasses = `flex-none w-8 text-right mr-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const sectionClasses = `mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`;

  return (
      <form onSubmit={handleSubmit} className={formClasses}>
        <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {initialValues.id ? 'Edit Recipe' : 'Create New Recipe'}
        </h2>

        <div className={sectionClasses}>
          <div className="mb-6">
            <label htmlFor="title" className={labelClasses}>
              Recipe Title*
            </label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputClasses}
                placeholder="Enter recipe title"
                required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className={labelClasses}>
              Description*
            </label>
            <textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className={inputClasses}
                placeholder="Describe your recipe"
                required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="imageUrl" className={labelClasses}>
                Image URL*
              </label>
              <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className={inputClasses}
                  placeholder="https://example.com/image.jpg"
                  required
              />
            </div>
            <div>
              <label htmlFor="difficulty" className={labelClasses}>
                Difficulty*
              </label>
              <select
                  id="difficulty"
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                  className={inputClasses}
                  required
              >
                {difficultyOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={sectionClasses}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cookingTime" className={labelClasses}>
                Cooking Time (minutes)*
              </label>
              <input
                  type="number"
                  id="cookingTime"
                  value={cookingTime}
                  onChange={e => setCookingTime(parseInt(e.target.value))}
                  min="1"
                  className={inputClasses}
                  required
              />
            </div>
            <div>
              <label htmlFor="servings" className={labelClasses}>
                Servings*
              </label>
              <input
                  type="number"
                  id="servings"
                  value={servings}
                  onChange={e => setServings(parseInt(e.target.value))}
                  min="1"
                  className={inputClasses}
                  required
              />
            </div>
          </div>
        </div>

        <div className={sectionClasses}>
          <label className={`${labelClasses} mb-4`}>
            Ingredients*
          </label>
          {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-3 group">
                <input
                    type="text"
                    value={ingredient}
                    onChange={e => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className={inputClasses}
                />
                <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className={`${removeButtonClasses} opacity-0 group-hover:opacity-100`}
                    disabled={ingredients.length <= 1}
                >
                  ✕
                </button>
              </div>
          ))}
          <button
              type="button"
              onClick={handleAddIngredient}
              className={`${addButtonClasses} mt-4`}
          >
            + Add Ingredient
          </button>
        </div>

        <div className={sectionClasses}>
          <label className={`${labelClasses} mb-4`}>
            Instructions*
          </label>
          {instructions.map((instruction, index) => (
              <div key={index} className="flex items-start mb-4 group">
                <div className={stepNumberClasses}>
                  {index + 1}.
                </div>
                <textarea
                    value={instruction}
                    onChange={e => handleInstructionChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    rows={2}
                    className={inputClasses}
                />
                <button
                    type="button"
                    onClick={() => handleRemoveInstruction(index)}
                    className={`${removeButtonClasses} opacity-0 group-hover:opacity-100`}
                    disabled={instructions.length <= 1}
                >
                  ✕
                </button>
              </div>
          ))}
          <button
              type="button"
              onClick={handleAddInstruction}
              className={`${addButtonClasses} mt-4`}
          >
            + Add Step
          </button>
        </div>

        <div className={sectionClasses}>
          <label className={`${labelClasses} mb-4`}>
            Dietary Information
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dietaryOptions.map(option => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                      type="checkbox"
                      checked={dietaryInfo.includes(option)}
                      onChange={() => handleDietaryToggle(option)}
                      className={checkboxClasses}
                  />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                {option}
              </span>
                </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
              type="submit"
              disabled={isSubmitting}
              className={buttonClasses}
          >
            {isSubmitting ? (
                <span className="flex items-center">
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></span>
              Saving...
            </span>
            ) : initialValues.id ? 'Update Recipe' : 'Create Recipe'}
          </button>
        </div>
      </form>
  );
};

export default RecipeForm;