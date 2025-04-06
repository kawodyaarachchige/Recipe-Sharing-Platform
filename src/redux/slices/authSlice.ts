import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockApi } from '../../api/mockApi';
import { User } from '../../types';
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
    error: null
};
export const login = createAsyncThunk('auth/login', async (credentials: {
    username: string;
    password: string;
}, {
                                                               rejectWithValue
                                                           }) => {
    try {
        const user = await mockApi.login(credentials);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});
export const signup = createAsyncThunk('auth/signup', async (userData: {
    username: string;
    password: string;
    email: string;
}, {
                                                                 rejectWithValue
                                                             }) => {
    try {
        const user = await mockApi.signup(userData);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});
export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('user');
    return null;
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: state => {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
            state.loading = true;
            state.error = null;
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        }).addCase(signup.pending, state => {
            state.loading = true;
            state.error = null;
        }).addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        }).addCase(logout.fulfilled, state => {
            state.user = null;
            state.isAuthenticated = false;
        });
    }
});
export const {
    clearError
} = authSlice.actions;
export default authSlice.reducer;