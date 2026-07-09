import api from '../utils/api';
import { create } from 'zustand';

export const usePostStore = create((set) => ({
    posts: [],
    loading: false,
    error: null,

    //Register
    fetchPosts: async () => {
        set({ loading: true, error: null });

        //Api Call
        try {
            const allPosts = await api.get('/post');;
            set({ loading: false, posts: allPosts.data.data });
            return { success: true, data: allPosts.data };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Field to fetch posts";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },


}))

