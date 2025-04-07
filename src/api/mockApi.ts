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
    favoriteRecipes: []
},{
    id: '3',
    username: 'Keminda',
    email: 'keminda@example.com',
    favoriteRecipes: []
}
];
let recipes: Recipe[] = [{
    id: '4',
    title: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry with grilled chicken in spiced tomato sauce.',
    ingredients: [
        '500g chicken thighs',
        '150g yogurt',
        '2 tbsp tikka masala paste',
        '1 onion (diced)',
        '400g canned tomatoes',
        '100ml heavy cream',
        '1 tsp garam masala'
    ],
    instructions: [
        'Marinate chicken in yogurt and spices for 1 hour.',
        'Grill chicken until charred.',
        'Sauté onions, add paste and tomatoes, simmer.',
        'Stir in cream and grilled chicken.',
        'Sprinkle with garam masala.'
    ],
    cookingTime: 40,
    servings: 4,
    difficulty: 'Medium',
    imageUrl: 'https://www.seriouseats.com/thmb/DbQHUK2yNCALBnZE-H1M2AKLkok=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG',
    createdBy: '4',
    rating: 4.7,
    dietaryInfo: ['contains dairy'],
    createdAt: '2023-03-05T14:20:00Z',
    authorName: 'Raj'
},
    {
        id: '5',
        title: 'Beef Tacos',
        description: 'Crispy Mexican tacos with seasoned beef, salsa, and fresh toppings.',
        ingredients: [
            '8 corn tortillas',
            '300g ground beef',
            '1 tbsp taco seasoning',
            '1 avocado (sliced)',
            '50g shredded cheese',
            'Fresh cilantro',
            'Lime wedges'
        ],
        instructions: [
            'Brown beef with taco seasoning.',
            'Warm tortillas in a dry pan.',
            'Fill with beef, avocado, cheese, and cilantro.',
            'Serve with lime wedges.'
        ],
        cookingTime: 15,
        servings: 4,
        difficulty: 'Easy',
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
        createdBy: '5',
        rating: 4.6,
        dietaryInfo: ['contains gluten (optional)'],
        createdAt: '2023-03-12T18:45:00Z',
        authorName: 'Carlos'
    },
    {
        id: '6',
        title: 'Sushi Rolls',
        description: 'Homemade sushi with fresh salmon, avocado, and sticky rice.',
        ingredients: [
            '200g sushi rice',
            '100g fresh salmon',
            '1 avocado',
            'Nori sheets',
            '1 tbsp rice vinegar',
            'Soy sauce (for serving)'
        ],
        instructions: [
            'Cook and season rice with vinegar.',
            'Slice salmon and avocado into strips.',
            'Spread rice on nori, add fillings, and roll tightly.',
            'Slice into pieces and serve with soy sauce.'
        ],
        cookingTime: 30,
        servings: 2,
        difficulty: 'Hard',
        imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        createdBy: '6',
        rating: 4.9,
        dietaryInfo: ['contains fish'],
        createdAt: '2023-04-01T11:10:00Z',
        authorName: 'Yuki'
    },
    {
        id: '7',
        title: 'Hummus',
        description: 'Creamy Middle Eastern dip made with chickpeas, tahini, and lemon.',
        ingredients: [
            '400g canned chickpeas',
            '2 tbsp tahini',
            '1 garlic clove',
            'Juice of 1 lemon',
            '2 tbsp olive oil',
            'Paprika (for garnish)'
        ],
        instructions: [
            'Blend chickpeas, tahini, garlic, and lemon juice until smooth.',
            'Drizzle with olive oil and sprinkle paprika.',
            'Serve with pita bread.'
        ],
        cookingTime: 10,
        servings: 4,
        difficulty: 'Easy',
        imageUrl: 'https://carlsbadcravings.com/wp-content/uploads/2020/07/Plain-Hummus-vFINAL9.jpg',
        createdBy: '7',
        rating: 4.8,
        dietaryInfo: ['vegan', 'gluten-free (check pita)'],
        createdAt: '2023-04-18T08:15:00Z',
        authorName: 'Layla'
    },
    {
        id: '8',
        title: 'Thai',
        description: 'Stir-fried Thai noodles with shrimp, tofu, and peanuts.',
        ingredients: [
            '200g rice noodles',
            '100g shrimp',
            '100g tofu',
            '2 eggs',
            '50g bean sprouts',
            '2 tbsp tamarind sauce',
            'Crushed peanuts'
        ],
        instructions: [
            'Soak noodles, then stir-fry with shrimp and tofu.',
            'Push ingredients aside, scramble eggs in the pan.',
            'Add sauce and toss everything together.',
            'Top with bean sprouts and peanuts.'
        ],
        cookingTime: 25,
        servings: 2,
        difficulty: 'Medium',
        imageUrl: 'https://www.elmundoeats.com/wp-content/uploads/2024/06/FP-Authentic-pad-Thai-in-a-plate.jpg',
        createdBy: '8',
        rating: 4.7,
        dietaryInfo: ['contains shellfish', 'contains eggs'],
        createdAt: '2023-05-22T19:30:00Z',
        authorName: 'Narin'
    },
    {
        id: '9',
        title: 'Croissants',
        description: 'Flaky French pastries with buttery layers.',
        ingredients: [
            '500g all-purpose flour',
            '250g cold butter',
            '10g yeast',
            '150ml milk',
            '1 tsp sugar',
            '1 egg (for egg wash)'
        ],
        instructions: [
            'Make dough, fold in butter layers, and chill repeatedly.',
            'Roll, cut into triangles, and shape into crescents.',
            'Bake at 200°C (390°F) until golden.'
        ],
        cookingTime: 180,
        servings: 12,
        difficulty: 'Hard',
        imageUrl: 'https://www.southernliving.com/thmb/xpOAs7AHYTQ0o38EaEqE3AJqQKg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/27854_OE_CroissantSand_367-71abd1d7149f44b3b6344e7dba790c73.jpg',
        createdBy: '9',
        rating: 4.9,
        dietaryInfo: ['contains dairy', 'contains gluten'],
        createdAt: '2023-06-10T07:00:00Z',
        authorName: 'Pierre'
    },
    {
        id: '10',
        title: 'Miso Soup',
        description: 'Japanese comfort soup with tofu, seaweed, and miso paste.',
        ingredients: [
            '4 cups dashi stock',
            '3 tbsp miso paste',
            '100g tofu (cubed)',
            '10g wakame seaweed',
            '2 green onions (sliced)'
        ],
        instructions: [
            'Heat dashi stock, dissolve miso paste.',
            'Add tofu and seaweed, simmer for 5 minutes.',
            'Garnish with green onions.'
        ],
        cookingTime: 15,
        servings: 4,
        difficulty: 'Easy',
        imageUrl: 'https://thestayathomechef.com/wp-content/uploads/2020/04/Miso-Soup-2-scaled.jpg',
        createdBy: '10',
        rating: 4.5,
        dietaryInfo: ['vegan', 'gluten-free (check miso)'],
        createdAt: '2023-06-25T12:20:00Z',
        authorName: 'Hiroshi'
    },{
        id: '11',
        title: 'Greek Moussaka',
        description: 'Hearty baked casserole with eggplant, spiced lamb, and creamy béchamel.',
        ingredients: [
            '2 large eggplants (sliced)',
            '500g ground lamb',
            '1 onion (diced)',
            '2 cloves garlic (minced)',
            '400g canned tomatoes',
            '1 tsp cinnamon',
            '100g grated cheese',
            'For béchamel: 50g butter, 50g flour, 500ml milk, 1 egg yolk'
        ],
        instructions: [
            'Salt eggplant slices, rinse, and fry until golden.',
            'Brown lamb with onion, garlic, tomatoes, and cinnamon.',
            'Layer eggplant and lamb in a baking dish.',
            'Make béchamel: Melt butter, whisk in flour, add milk, then egg yolk.',
            'Pour béchamel over layers, sprinkle cheese, bake at 180°C (350°F) for 40 minutes.'
        ],
        cookingTime: 90,
        servings: 6,
        difficulty: 'Hard',
        imageUrl: 'https://e498h76z5mp.exactdn.com/wp-content/uploads/2014/02/Vegetarian-Moussaka.jpg?lossy=1&quality=65&ssl=1',
        createdBy: '11',
        rating: 4.8,
        dietaryInfo: ['contains dairy', 'contains meat'],
        createdAt: '2023-07-15T13:45:00Z',
        authorName: 'Elena'
    },
    {
        id: '12',
        title: 'Vietnamese Pho',
        description: 'Aromatic beef noodle soup with star anise, ginger, and fresh herbs.',
        ingredients: [
            '1kg beef bones',
            '500g beef brisket',
            '1 onion (charred)',
            '3-inch ginger (charred)',
            '2 star anise',
            '1 cinnamon stick',
            '200g rice noodles',
            'Fresh herbs: Thai basil, cilantro, mint',
            'Lime wedges, chili slices'
        ],
        instructions: [
            'Simmer bones and brisket with charred onion, ginger, and spices for 4+ hours.',
            'Strain broth, slice brisket thinly.',
            'Cook noodles, place in bowls with raw beef slices (optional).',
            'Pour hot broth over noodles, garnish with herbs, lime, and chili.'
        ],
        cookingTime: 240,
        servings: 4,
        difficulty: 'Medium',
        imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
        createdBy: '12',
        rating: 4.9,
        dietaryInfo: ['contains meat'],
        createdAt: '2023-08-05T10:00:00Z',
        authorName: 'Minh'
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