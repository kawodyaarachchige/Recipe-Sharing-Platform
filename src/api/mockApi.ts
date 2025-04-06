import { User } from '../types';

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
    async getUsers(): Promise<User[]> {
        await randomDelay();
        return users;
    }

};