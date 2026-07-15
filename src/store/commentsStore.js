import api from '../services/api';
import { create } from 'zustand';
import { usePostStore } from './postStore';

// Helper to update the postStore comment count
const updatePostCommentCount = (postId, increment) => {
    const { posts } = usePostStore.getState();
    usePostStore.setState({
        posts: posts.map((p) => p.postId === postId ? { ...p, commentCount: p.commentCount + increment } : p)
    });
};

export const useCommentStore = create((set, get) => ({
    comments: [],
    loading: false,
    error: null,

    fetchComments: async (postId) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.get(`/comment/${postId}`);
            set({ loading: false, comments: data.data });
            return { success: true, data: data.data };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to fetch comments";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },

    addComment: async (postId, body, parentCommentId = null) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post(`/comment`, { postId, body, parentCommentId });

            set((state) => ({ loading: false, comments: [...state.comments, data.data] }));

            //Update comment cout without refresh
            updatePostCommentCount(postId, 1);

            return { success: true, data: data };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to add comment";
            set({ loading: false, error: errMsg });
            return { success: false, error: errMsg };
        }
    },

    deleteComment: async (commentId) => {
        try {
            const comment = get().comments.find((c) => c.commentId === commentId);
            await api.delete(`/comment/${commentId}`);

            set((state) => ({ comments: state.comments.filter((c) => c.commentId !== commentId) }));

            if (comment?.postId) {
                updatePostCommentCount(comment.postId, -1);
            }
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || "Failed to delete comment" };
        }
    },
}));