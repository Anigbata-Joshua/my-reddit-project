import { useRef } from 'react';
import { Plus, MoreHorizontal, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommunityBanner({
    community,
    communityName,
    user,
    hasJoined,
    onJoinToggle,
    onBannerUpload
}) {
    const navigate = useNavigate();
    const bannerInputRef = useRef(null);

    return (
        <div className="bg-white border-b border-gray-200">
            {/* Banner Image */}
            <div className="relative w-full h-48 md:h-72 bg-gray-200 overflow-hidden group">
                {community?.banner ? (
                    <img
                        src={community.banner}
                        alt={`${communityName} banner`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}

                {/* Upload banner button — only show to logged in users */}
                {user && (
                    <button
                        onClick={() => bannerInputRef.current.click()}
                        className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                        <Camera size={12} /> Change Banner
                    </button>
                )}
                <input
                    type="file"
                    ref={bannerInputRef}
                    onChange={onBannerUpload}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                />
            </div>

            {/* Community Info Row */}
            <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-black text-lg -mt-6 border-4 border-white shadow-sm">
                        {communityName?.[0]?.toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-black text-gray-950">r/{communityName}</h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => user ? navigate('/createpost') : navigate('/login')}
                        className="flex items-center gap-1.5 px-4 py-2 hover:bg-gray-100 border border-gray-300 font-bold text-xs text-gray-700 rounded-full transition-all cursor-pointer"
                    >
                        <Plus size={16} /> Create Post
                    </button>

                    {user && (
                        <button
                            onClick={onJoinToggle}
                            className={`px-5 py-2 font-bold text-xs rounded-full transition-all cursor-pointer ${hasJoined
                                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                                    : 'bg-gray-900 hover:bg-black text-white'
                                }`}
                        >
                            {hasJoined ? 'Joined' : 'Join'}
                        </button>
                    )}

                    <button className="p-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full transition-all">
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}