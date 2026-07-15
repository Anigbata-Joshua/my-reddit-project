import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuthStore } from '../../../store/authstore';
import { usePostStore } from '../../../store/postStore';
import { useCommunityStore } from '../../../store/communityStore';
import { uploadAvatar } from '../utils/avatarUpload';

const tabs = [{ label: 'Overview' }, { label: 'Posts' }, { label: 'Comments' }, { label: 'Saved' }, { label: 'History' }, { label: 'Hidden' }, { label: 'Upvoted' }, { label: 'Downvoted' }];

export function useProfilePage() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState('');
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    
    const { user, updateUser } = useAuthStore();
    const { communities, fetchCommunities } = useCommunityStore();
    const { posts, loading, fetchPosts } = usePostStore();

    // Fix: Run initial fetches strictly on mount to prevent infinite re-render loops
    useEffect(() => {
        fetchPosts();
        if (communities.length === 0) {
            fetchCommunities();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!uploadSuccess) return; 
        const timer = window.setTimeout(() => setUploadSuccess(''), 2200);
        return () => window.clearTimeout(timer);
    }, [uploadSuccess]);

    useEffect(() => {
        const onClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target))
                setOpenDropdownId(null);
        }; 
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const toggleDropdown = (id, event) => { 
        event.stopPropagation(); 
        setOpenDropdownId(openDropdownId === id ? null : id); 
    };

    const handleAvatarUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setUploadError(''); 
        setUploadSuccess(''); 
        setUploadingAvatar(true);
        try {
            const avatarUrl = await uploadAvatar(file);
            if (!avatarUrl) throw new Error('No avatar URL returned by the server.');
            updateUser({ avatar: avatarUrl });
            setUploadSuccess('Profile photo updated.');
            event.target.value = '';
        } catch (error) {
            setUploadError(error.message || 'We could not upload your photo right now. Please try again.');
        } finally {
            setUploadingAvatar(false);
        }
    };

    const userPosts = useMemo(() => posts?.filter((post) => post.author === user?.username) || [], [posts, user?.username]);
    const shouldShowPosts = activeTab === 'Overview' || activeTab === 'Posts';

    // Safely extract and format createdAt value
    const createdAt = user?.createdAt || null;

    return {
        activeTab,
        setActiveTab,
        openDropdownId,
        dropdownRef,
        fileInputRef,
        tabs,
        user,
        createdAt,
        uploadError,
        uploadSuccess,
        uploadingAvatar,
        loading,
        communities,
        userPosts,
        shouldShowPosts,
        toggleDropdown,
        handleAvatarUpload,
    };
}