import { create } from 'zustand';
import api from '../services/api';

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
            const payload = response.data?.data || response.data;

            const userData = payload?.user || payload;
            const tokenStr = payload?.token || response.data?.token;

            const formattedUser = {
                userId: userData?.userId,
                username: userData?.username,
                email: userData?.email,
                avatar: userData?.avatar,
                createdAt: userData?.createdAt || new Date().toISOString(),
            };

            if (tokenStr) {
                localStorage.setItem('token', tokenStr);
            }
            localStorage.setItem('user', JSON.stringify(formattedUser));

            set({ loading: false, user: formattedUser, error: null });
            return { success: true, data: formattedUser };

        } catch (error) {
            const errMsg = error.response?.data?.message || error.message || "Registration failed";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },

    // Log In Sequence
    login: async (email, password) => {
        set({ loading: true, error: null });

        try {
            const response = await api.post('/auth/login', { email, password });
            const payload = response.data?.data || response.data;
            const userData = payload?.user || payload;

            const formattedUser = {
                userId: userData?.userId,
                username: userData?.username,
                email: userData?.email,
                avatar: userData?.avatar,
                createdAt: userData?.createdAt,
            };

            const tokenStr = payload?.token || response.data?.token;
            if (tokenStr) {
                localStorage.setItem('token', tokenStr);
            }
            localStorage.setItem('user', JSON.stringify(formattedUser));

            set({ loading: false, user: formattedUser, error: null });
            return { success: true, data: formattedUser };

        } catch (error) {
            const errMsg = error.response?.data?.message || error.message || "Login failed";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },

    updateUser: (updatedData) => {
        set((state) => {
            const updated = { ...state.user, ...updatedData };
            localStorage.setItem('user', JSON.stringify(updated));
            return { user: updated };
        });
    },

    // Log Out Sequence
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, error: null });
    },

    clearError: () => set({ error: null })
}));