import api from '../services/api';
import { create } from 'zustand';

export const useCommentStore = create((set) => ({
    comments: [],
    loading: false,
    error: null,

    // Fetch all comments for a post
    fetchComments: async (postId) => {
        set({ loading: true, error: null });

        try {
            const response = await api.get(`/comment/${postId}`);

            set({ loading: false, comments: response.data.data });
            return { success: true, data: response.data.data };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to fetch comments";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },

    // Add a new comment via parentCommentId
    addComment: async (postId, body, parentCommentId = null) => {
        set({ loading: true, error: null });

        try {
            const response = await api.post(`/comment`, { postId, body, parentCommentId });

            set((state) => ({
                loading: false,
                comments: [...state.comments, response.data.data]
            }));
            return { success: true, data: response.data };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to add comment";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },

deleteComment: async (commentId) => {
    try {
        await api.delete(`/comment/${commentId}`);
        set((state) => ({
            comments: state.comments.filter((c) => c.commentId !== commentId)
        }));
        return { success: true };
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to delete comment";
        return { success: false, error: errMsg };
    }
},
}));