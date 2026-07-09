import api from '../utils/api';
import { create } from 'zustand';

export const useCommunityStore = create((set) => ({
    communities: [],
    loading: false,
    error: null,
    fetched: false,

    fetchCommunities: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/community');
            // Backend response shape: { success, message, data: [...] .
            const list = response.data?.data ?? response.data ?? [];
            
            set({ loading: false, communities: list, fetched: true });
            return { success: true, data: list };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to fetch communities";
            set({ loading: false, error: errMsg, fetched: true });
            return { success: false, error: errMsg };
        }
    },
}));

// Helper: resolve a `COM_...` communityId to a name. Falls back to the raw id
// if the community hasn't loaded yet or doesn't exist.
export const getCommunityName = (communities, communityId) => {
    if (!communityId) return '';
    const match = communities.find((c) => c.communityId === communityId);
    return match?.name || communityId;
};
