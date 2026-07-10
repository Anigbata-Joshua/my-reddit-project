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

    joinedCommunities: [],

    joinCommunity: async (name) => {
        try {
            await api.post(`/community/${name}/join`);
            set((state) => ({
                joinedCommunities: [...state.joinedCommunities, name],
                communities: state.communities.map((c) =>
                    c.name === name ? { ...c, memberCount: c.memberCount + 1 } : c
                )
            }));
            return { success: true };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to join community";
            return { success: false, error: errMsg };
        }
    },

    leaveCommunity: async (name) => {
        try {
            await api.post(`/community/${name}/leave`);
            set((state) => ({
                joinedCommunities: state.joinedCommunities.filter((n) => n !== name),
                communities: state.communities.map((c) =>
                    c.name === name ? { ...c, memberCount: c.memberCount - 1 } : c
                )
            }));
            return { success: true };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to leave community";
            return { success: false, error: errMsg };
        }
    },

    createCommunity: async (name, description) => {
        try {
            const response = await api.post('/community', { name, description });
            set((state) => ({
                communities: [...state.communities, response.data.community]
            }));
            return { success: true, data: response.data.community };
        } catch (error) {
            const errMsg = error.response?.data?.message || "Failed to create community";
            return { success: false, error: errMsg };
        }
    },


}));


export const getCommunityName = (communities, communityId) => {
    if (!communityId) return '';
    const match = communities.find((c) => c.communityId === communityId);
    return match?.name || communityId;
};

