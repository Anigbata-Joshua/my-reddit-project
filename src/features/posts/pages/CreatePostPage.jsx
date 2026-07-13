import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../../store/authstore';
import { ChevronDown, Image, Video, Link, Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote, Heading1, Sparkles, Smile, AlignLeft} from 'lucide-react';
import { useCommunityStore } from '../../../store/communityStore';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';


export default function CreatePostPage() {
    const { user } = useAuthStore();
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [body, setBody] = useState('');
    const [selectedTarget, setSelectedTarget] = useState(`u/${user?.username}`);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [communityId, setCommunityId] = useState('');
    const { communities, fetchCommunities } = useCommunityStore();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);


    useEffect(() => {
        fetchCommunities();
    }, []);

    useEffect(() => {
        function clickHandler(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', clickHandler);
        return () => document.removeEventListener('mousedown', clickHandler);
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
            console.error(error.message);
            setError('Failed to create post');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-gray-100">
            <div className="max-w-[1240px] mx-auto px-4 py-8 lg:px-12">
                <div className="max-w-[740px] space-y-6">

                    {/* Top Bar Actions: Destination Selector & Drafts Quick Link */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-xs font-semibold rounded-full transition-colors focus:outline-none"
                            >
                                <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center text-[10px]">🤠</div>
                                <span>{selectedTarget}</span>
                                <ChevronDown size={14} className="text-gray-500" />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1">
                                    <button
                                        type="button"
                                        onClick={() => { setSelectedTarget(`u/${user?.username}`); setIsDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 flex items-center gap-2"
                                    >
                                    </button>
                                    {communities.map((c) => (
                                        <button
                                            key={c.communityId}
                                            type="button"
                                            onClick={() => {
                                                setSelectedTarget(`r/${c.name}`);
                                                setCommunityId(c.communityId);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <span className="text-[10px] text-blue-500">r/</span> {c.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="button" className="text-xs font-bold text-gray-600 hover:text-black transition-colors">
                            Drafts
                        </button>
                    </div>

                    {/* Form Area */}
                    <form onSubmit={handlePublish} className="space-y-4">
                        {/* Title Input Field */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Title*"
                                maxLength={300}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-xl font-medium tracking-tight placeholder-gray-400 text-black border-none focus:ring-0 p-0 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Tags Insertion Row */}
                        <div>
                            <button
                                type="button"
                                className="flex items-center gap-1.5 px-3 py-1 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                <Sparkles size={12} className="text-gray-400" />
                                Add tags
                            </button>
                        </div>

                        {/* Rich Editor Text Area Canvas Layout */}
                        <div className="space-y-2">
                            <textarea
                                placeholder="Body text (optional)"
                                rows={8}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="w-full text-sm placeholder-gray-400 text-black border-none focus:ring-0 p-0 focus:outline-none resize-none leading-relaxed"
                            />

                            {/* Fixed Floating Rich-text Formatting Toolbar */}
                            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2 bg-white shadow-sm">
                                <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                                    <ToolbarButton icon={<Link size={15} />} label="Insert link" />
                                    <button
                                        type="button"
                                        title="Add image"
                                        onClick={() => fileInputRef.current.click()}
                                        className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition-colors shrink-0"
                                    >
                                        <Image size={15} />
                                    </button>                                    <ToolbarButton icon={<Video size={15} />} label="Add video" />
                                    <div className="w-[1px] h-4 bg-gray-200 mx-1 shrink-0" />
                                    <ToolbarButton icon={<Bold size={15} />} label="Bold text" />
                                    <ToolbarButton icon={<Italic size={15} />} label="Italic text" />
                                    <ToolbarButton icon={<Strikethrough size={15} />} label="Strikethrough" />
                                    <ToolbarButton icon={<Code size={15} />} label="Code block" />
                                    <div className="w-[1px] h-4 bg-gray-200 mx-1 shrink-0" />
                                    <ToolbarButton icon={<List size={15} />} label="Bulleted list" />
                                    <ToolbarButton icon={<ListOrdered size={15} />} label="Numbered list" />
                                    <ToolbarButton icon={<Quote size={15} />} label="Blockquote" />
                                    <ToolbarButton icon={<Heading1 size={15} />} label="Heading" />
                                    <ToolbarButton icon={<Smile size={15} />} label="Insert emoji" />
                                </div>

                                <div className="shrink-0 pl-2">
                                    <ToolbarButton icon={<AlignLeft size={15} />} label="Extended options" />
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {imagePreview && (
                                <div className="relative mt-2">
                                    <img src={imagePreview} alt="preview" className="w-full rounded-lg max-h-64 object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => { setImage(null); setImagePreview(null); }}
                                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Bottom Actions Row: Save Draft & Publish */}
                        <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-400 font-bold text-xs rounded-full cursor-not-allowed transition-colors"
                                disabled
                            >
                                Save Draft
                            </button>
                            {error && <p className="text-xs text-red-500">{error}</p>}
                            <button
                                type="submit"
                                disabled={!title.trim()}
                                className={`px-4 py-2 font-bold text-xs rounded-full transition-all ${title.trim()
                                    ? 'bg-black hover:bg-gray-800 text-white cursor-pointer shadow-sm'
                                    : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                Post
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

// Sub-component wrapper for clean styling across editor items
function ToolbarButton({ icon, label }) {
    return (
        <button
            type="button"
            title={label}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition-colors shrink-0 focus:outline-none"
        >
            {icon}
        </button>
    );
}