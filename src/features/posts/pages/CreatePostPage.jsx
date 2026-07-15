import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../../store/authstore';
import { useCommunityStore } from '../../../store/communityStore';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import CreatePostTopSection from '../components/CreatePostTopSection';
import CreatePostForm from '../components/CreatePostForm';


export default function CreatePostPage() {
    const { user } = useAuthStore();
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [body, setBody] = useState('');
    const [selectedTarget, setSelectedTarget] = useState(`u/${user?.username}`);
    const [communityId, setCommunityId] = useState('');
    const { communities, fetchCommunities } = useCommunityStore();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);


    useEffect(() => {
        fetchCommunities();
    }, []);

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!title.trim()) return setError('Title is required');
        if (!communityId) return setError('Please select a community');

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('communityId', communityId);
            if (image) formData.append('image', image);

            await api.post('/post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/');
        } catch (error) {
            setError('Failed to create post. Please try again.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setImage(null);
            setImagePreview(null);
            return;
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-gray-100">
            <div className="max-w-310 mx-auto px-4 py-8 lg:px-12">
                <div className="max-w-185 space-y-6">

                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <CreatePostTopSection
                            user={user}
                            selectedTarget={selectedTarget}
                            onSelectTarget={setSelectedTarget}
                            onSelectCommunity={setCommunityId}
                        />
                        <button type="button" className="text-xs font-bold text-gray-600 transition-colors hover:text-black"> Drafts</button>
                    </div>

                    <CreatePostForm
                        title={title}
                        body={body}
                        error={error}
                        imagePreview={imagePreview}
                        fileInputRef={fileInputRef}
                        onTitleChange={setTitle}
                        onBodyChange={setBody}
                        onPublish={handlePublish}
                        onImageSelect={handleImageChange}
                        onImageRemove={() => {
                            setImage(null);
                            setImagePreview(null);
                        }}
                    />

                </div>
            </div>
        </div>
    );
}