export interface User {
  id: string;
  username: string;
  email: string;
  favoriteRecipes: string[];
}
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: string;
  imageUrl: string;
  createdBy: string;
  authorName: string;
  rating: number;
  dietaryInfo: string[];
  createdAt: string;
}