import api from '../services/api';
import { create } from 'zustand';

export const usePostStore = create((set, get) => ({
    posts: [],
    loading: false,
    error: null,
    lastFetched: null,

    // Fetch all posts
  fetchPosts: async () => {
    const now = Date.now();
    
    // If cache is valid, return the existing state immediately
    if (get().lastFetched && now - get().lastFetched < 60000) {
        return { success: true, data: get().posts, cached: true };
    }
    
    set({ loading: true, error: null });
    try {
        const allPosts = await api.get('/post');
        const postData = allPosts.data.data;
        
        set({ loading: false, posts: postData, lastFetched: now });
        return { success: true, data: postData, cached: false };
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to fetch posts";
        set({ loading: false, error: errMsg });
        return { success: false, error: errMsg };
    }
},

}))

