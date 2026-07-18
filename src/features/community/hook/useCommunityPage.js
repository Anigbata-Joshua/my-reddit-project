// features/community/hooks/useCommunityPage.js
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePostStore } from '../../../store/postStore';
import { useCommunityStore } from '../../../store/communityStore';
import { useAuthStore } from '../../../store/authstore';
import api from '../../../services/api'; 

export default function useCommunityPage() {
    const { communityName } = useParams();
    const { posts, loading, fetchPosts } = usePostStore();
    const {
        communities,
        fetchCommunities,
        joinCommunity,
        leaveCommunity,
        joinedCommunities
    } = useCommunityStore();
    const { user } = useAuthStore();

    const hasJoined = joinedCommunities.includes(communityName);

    useEffect(() => {
        fetchPosts();
        if (communities.length === 0) fetchCommunities();
    }, [communityName, fetchPosts, fetchCommunities, communities.length]);

    const community = communities.find((c) => c.name === communityName);
    const communityId = community?.communityId;

    const communityPosts = communityId
        ? posts.filter((p) => p.communityId === communityId)
        : posts.filter((p) => p.communityId === communityName);

    const handleJoinToggle = () => {
        if (hasJoined) {
            leaveCommunity(communityName);
        } else {
            joinCommunity(communityName);
        }
    };

    const handleBannerUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            await api.post(`/community/${communityName}/banner`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchCommunities();
        } catch (error) {
            console.error('Banner upload failed');
        }
    };

    return {
        communityName,
        community,
        communityPosts,
        loading,
        user,
        hasJoined,
        handleJoinToggle,
        handleBannerUpload
    };
}