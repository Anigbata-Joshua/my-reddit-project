import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus, SlidersHorizontal } from 'lucide-react';

export default function ProfileHeader({
    user,
    activeTab,
    tabs,
    onTabChange,
    onAvatarClick,
    fileInputRef,
    onAvatarUpload,
    onCreatePost,
    uploadingAvatar,
}) {
    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onAvatarClick}
                        className="group relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-gray-200 shadow-sm transition-transform duration-200 hover:scale-[1.02]"
                    >
                        {user?.avatar ? (
                            <img src={user.avatar} alt="avatar" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-200 to-gray-100 text-xl">
                                🤖
                            </div>
                        )}
                        {uploadingAvatar ? (
                            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 text-[10px] font-semibold text-white">
                                Uploading...
                            </span>
                        ) : (
                            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                                Edit
                            </span>
                        )}
                    </button>
                    <input type="file" ref={fileInputRef} onChange={onAvatarUpload} className="hidden" accept="image/*" />
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">{user?.username}</h1>
                        <p className="text-xs font-medium text-gray-500">u/{user?.username}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-1 overflow-x-auto border-b border-gray-200 pb-px scrollbar-none">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        type="button"
                        onClick={() => onTabChange(tab.label)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${activeTab === tab.label ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <Eye size={14} className="text-gray-500" />
                    <span>Showing all content</span>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        to="/createpost"
                        onClick={onCreatePost}
                        className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-800 transition-colors hover:bg-gray-200"
                    >
                        <Plus size={14} /> Create Post
                    </Link>
                    <button
                        type="button"
                        className="rounded-full p-1.5 text-gray-600 transition-colors hover:bg-gray-100"
                    >
                        <SlidersHorizontal size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
