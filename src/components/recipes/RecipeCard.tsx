import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, StarIcon, UserIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  cookingTime: number;
  rating: number;
  imageUrl: string;
  authorName: string;
}
const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  description,
  cookingTime,
  rating,
  imageUrl,
  authorName
}) => {
  const {
    isDarkMode
  } = useSelector((state: RootState) => state.theme);
  return <Link to={`/recipes/${id}`} className="block group">
      <div className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-lg'} rounded-lg overflow-hidden shadow-md transition-shadow duration-300`}>
        <div className="h-48 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-800 group-hover:text-teal-600'} transition-colors`}>
            {title}
          </h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1 line-clamp-2`}>
            {description}
          </p>
          <div className={`flex items-center mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <UserIcon className="h-4 w-4 mr-1" />
            <p className="text-sm">Recipe by {authorName}</p>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center text-gray-500">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">{cookingTime} min</span>
            </div>
            <div className="flex items-center text-amber-500">
              <StarIcon className="h-4 w-4 mr-1 fill-current" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>;
};
export default RecipeCard;