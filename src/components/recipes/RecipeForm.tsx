import React, { useState } from 'react';
import { Recipe } from '../../types';
import { useSelector } from 'react-redux';
import {RootState} from "../../redux/store.ts";


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

  const formClasses = `rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`;
  const inputClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`;
  const labelClasses = `block font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const buttonClasses = `font-medium py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 ${isDarkMode ? 'bg-teal-700 hover:bg-teal-600 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'}`;
  const addButtonClasses = `mt-1 ${isDarkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'}`;
  const removeButtonClasses = `ml-2 px-2 py-2 ${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`;
  const checkboxClasses = `h-4 w-4 text-teal-600 focus:ring-teal-500 rounded ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`;
  const stepNumberClasses = `flex-none w-8 text-right mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;

  return (
      <form onSubmit={handleSubmit} className={formClasses}>
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
              required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className={labelClasses}>
            Ingredients*
          </label>
          {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
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
                    className={removeButtonClasses}
                    disabled={ingredients.length <= 1}
                >
                  ✕
                </button>
              </div>
          ))}
          <button
              type="button"
              onClick={handleAddIngredient}
              className={addButtonClasses}
          >
            + Add Ingredient
          </button>
        </div>
        <div className="mb-6">
          <label className={labelClasses}>
            Instructions*
          </label>
          {instructions.map((instruction, index) => (
              <div key={index} className="flex items-center mb-2">
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
                    className={removeButtonClasses}
                    disabled={instructions.length <= 1}
                >
                  ✕
                </button>
              </div>
          ))}
          <button
              type="button"
              onClick={handleAddInstruction}
              className={addButtonClasses}
          >
            + Add Step
          </button>
        </div>
        <div className="mb-8">
          <label className={labelClasses}>
            Dietary Information
          </label>
          <div className="flex flex-wrap">
            {dietaryOptions.map(option => (
                <label key={option} className="flex items-center mr-4 mb-2">
                  <input
                      type="checkbox"
                      checked={dietaryInfo.includes(option)}
                      onChange={() => handleDietaryToggle(option)}
                      className={checkboxClasses}
                  />
                  <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {option}
              </span>
                </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
              type="submit"
              disabled={isSubmitting}
              className={buttonClasses}
          >
            {isSubmitting ? (
                <span className="flex items-center">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              Saving...
            </span>
            ) : initialValues.id ? 'Update Recipe' : 'Create Recipe'}
          </button>
        </div>
      </form>
  );
};

export default RecipeForm;