import { User , Recipe } from '../types';


let users: User[] = [{
    id: '1',
    username: 'Tharushi',
    email: 'tharu@example.com',
    favoriteRecipes: ['1', '3']
}, {
    id: '2',
    username: 'Kusal',
    email: 'kusal@example.com',
    favoriteRecipes: ['2']
},{
    id: '3',
    username: 'Keminda',
    email: 'keminda@example.com',
    favoriteRecipes: ['3']
}
];
let recipes: Recipe[] = [{
    id: '1',
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade cookies with melty chocolate chips and a soft center.',
    ingredients: ["200g all-purpose flour",
    "120g unsalted butter",
    "100g brown sugar",
    "100g granulated sugar",
    "1 large egg",
    "1 tsp vanilla extract",
    "1/2 tsp baking soda",
    "1/2 tsp salt",
    "200g chocolate chips"],
    instructions: ["200g all-purpose flour",
        "120g unsalted butter",
        "100g brown sugar",
        "100g granulated sugar",
        "1 large egg",
        "1 tsp vanilla extract",
        "1/2 tsp baking soda",
        "1/2 tsp salt",
        "200g chocolate chips"],
    cookingTime: 25,
    servings: 12,
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
    createdBy: "2",
    rating: 4.9,
    dietaryInfo: ["contains dairy", "contains eggs", "contains gluten"],
    createdAt: "2023-02-10T09:30:00Z",
    authorName: "Kusal"
}, {
    id: '2',
    title: 'Avocado Toast',
    description: 'Simple and nutritious breakfast with mashed avocado on toasted bread.',
    ingredients: ['2 slices of bread', '1 ripe avocado', 'Salt and pepper to taste', 'Red pepper flakes', 'Extra virgin olive oil', 'Optional: 2 eggs'],
    instructions: ['Toast the bread until golden and firm.', 'Remove the pit from the avocado and scoop the flesh into a bowl.', 'Mash the avocado with a fork and season with salt, pepper, and red pepper flakes.', 'Spread the mashed avocado on top of the toasted bread.', 'Drizzle with olive oil and add additional toppings if desired.', 'Optional: Top with a fried or poached egg.'],
    cookingTime: 10,
    servings: 1,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    createdBy: '3',
    rating: 4.5,
    dietaryInfo: ['vegetarian', 'vegan optional'],
    createdAt: '2023-02-20T09:30:00Z',
    authorName: 'Keminda'
}, {
    id: '3',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.Spicy and delicious!',
    ingredients: ['200g spaghetti', '100g pancetta', '2 large eggs', '50g pecorino cheese', '50g parmesan', 'Freshly ground black pepper', '1 clove of garlic'],
    instructions: ['Cook spaghetti in a large pot of boiling salted water.', 'In a pan, cook pancetta with garlic until crispy.', 'Beat eggs and mix with grated cheeses.', 'Drain pasta and add to the pan with pancetta.', 'Remove from heat and quickly stir in egg mixture.', 'Season with black pepper and serve immediately.'],
    cookingTime: 20,
    servings: 2,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    createdBy: '1',
    rating: 4.8,
    dietaryInfo: ['contains dairy', 'contains eggs'],
    createdAt: '2023-01-15T12:00:00Z',
    authorName: 'Tharushi'
}];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => delay(Math.random() * 800 + 200);
export const mockApi = {
    async login(credentials: {
        username: string;
        password: string;
    }): Promise<User> {
        await randomDelay();
        const user = users.find(u => u.username === credentials.username);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        return {
            ...user
        };
    },
    async signup(userData: {
        username: string;
        password: string;
        email: string;
    }): Promise<User> {
        await randomDelay();
        if (users.some(u => u.username === userData.username)) {
            throw new Error('Username already exists');
        }
        if (users.some(u => u.email === userData.email)) {
            throw new Error('Email already in use');
        }
        const newUser: User = {
            id: String(users.length + 1),
            username: userData.username,
            email: userData.email,
            favoriteRecipes: []
        };
        users = [...users, newUser];
        return newUser;
    },
    async getRecipes(): Promise<Recipe[]> {
        await randomDelay();
        return [...recipes];
    },
    async getRecipeById(id: string): Promise<Recipe> {
        await randomDelay();
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        return {
            ...recipe
        };
    },
    async createRecipe(recipeData: Omit<Recipe, 'id'>): Promise<Recipe> {
        await randomDelay();
        const author = users.find(u => u.id === recipeData.createdBy);
        const newRecipe: Recipe = {
            ...recipeData,
            id: String(recipes.length + 1),
            createdAt: new Date().toISOString(),
            authorName: author?.username || 'Unknown User'
        };
        recipes = [...recipes, newRecipe];
        return newRecipe;
    },
    async updateRecipe(recipeData: Recipe): Promise<Recipe> {
        await randomDelay();
        const index = recipes.findIndex(r => r.id === recipeData.id);
        if (index === -1) {
            throw new Error('Recipe not found');
        }
        const author = users.find(u => u.id === recipeData.createdBy);
        recipes[index] = {
            ...recipeData,
            authorName: author?.username || 'Unknown User'
        };
        return recipes[index];
    },
    async deleteRecipe(id: string): Promise<void> {
        await randomDelay();
        const index = recipes.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error('Recipe not found');
        }
        recipes = recipes.filter(r => r.id !== id);
    },
    async getFavorites(userId: string): Promise<Recipe[]> {
        await randomDelay();
        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }
        return recipes.filter(recipe => user.favoriteRecipes.includes(recipe.id));
    },
    async addToFavorites(userId: string, recipeId: string): Promise<Recipe> {
        await randomDelay();
        const userIndex = users.findIndex(u => u.id === userId);
        const recipe = recipes.find(r => r.id === recipeId);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        if (!users[userIndex].favoriteRecipes.includes(recipeId)) {
            users[userIndex].favoriteRecipes.push(recipeId);
        }
        return recipe;
    },
    async removeFromFavorites(userId: string, recipeId: string): Promise<void> {
        await randomDelay();
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        users[userIndex].favoriteRecipes = users[userIndex].favoriteRecipes.filter(id => id !== recipeId);
    },

    async getUsers(): Promise<User[]> {
        await randomDelay();
        return users;
    }

};