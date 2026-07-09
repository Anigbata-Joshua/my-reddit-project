import { create } from 'zustand';
import api from '../utils/api';

// Safe parse wrapper to protect against corrupted string crashes
const getStoredUser = () => {
    try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

export const useAuthStore = create((set) => ({
    user: getStoredUser(),
    loading: false,
    error: null,

    // Register Account Sequence
    register: async (username, email, password) => {
        set({ loading: true, error: null });

        try {
            const response = await api.post('/auth/register', { username, email, password });
            const payload = response.data.data;
            
            // Extract cleanly: extract nested user object if it exists, otherwise fallback to root payload
            const userData = payload.user ? payload.user : payload;
            const tokenStr = payload.token;

            localStorage.setItem('token', tokenStr);
            localStorage.setItem('user', JSON.stringify(userData));
            
            set({ loading: false, user: userData });
            return { success: true, data: response.data };

        } catch (error) {
            const errMsg = error.response?.data?.message || "Registration failed";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },

    // Log In Sequence
    login: async (email, password) => {
        set({ loading: true, error: null });

        try {
            const response = await api.post('/auth/login', { email, password });
            const payload = response.data.data;

            // Extract cleanly: extract nested user object if it exists, otherwise fallback to root payload
            const userData = payload.user ? payload.user : payload;
            const tokenStr = payload.token;

            localStorage.setItem('token', tokenStr);
            localStorage.setItem('user', JSON.stringify(userData));
            
            set({ loading: false, user: userData });
            return { success: true, data: userData };

        } catch (error) {
            const errMsg = error.response?.data?.message || "Login failed";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },

    // Log Out Sequence
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, error: null });
    }
}));