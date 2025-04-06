import { mockApi } from '../api/mockApi';
export const getUsernameById = async (userId: string): Promise<string> => {
  try {
    const users = await mockApi.getUsers();
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  } catch (error) {
    console.error('Error fetching username:', error);
    return 'Unknown User';
  }
};