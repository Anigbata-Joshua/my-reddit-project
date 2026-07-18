// features/community/components/CommunityAbout.jsx
import React from 'react';
import { BookOpen, Globe, ChevronDown } from 'lucide-react';

export default function CommunityAbout({ community, communityName, user }) {
  return (
    <div className="space-y-4">

      {/* About Widget */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-gray-950 uppercase tracking-wide">r/{communityName}</h3>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">
          {community?.description || "The internet's home for discussions about topics shared inside our community."}
        </p>

        <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-4 space-y-2">
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-bold text-gray-900">
              {community?.memberCount?.toLocaleString() || 0}
            </span>
            <span className="text-xs text-gray-500">members</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} />
            <span>Public Community</span>
          </div>
        </div>

        <button className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 rounded-full transition-all flex items-center justify-center gap-2">
          <BookOpen size={14} /> Community Guide
        </button>
      </div>

      {/* User Flair Widget */}
      {user && (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm">
          <h4 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3">User Flair</h4>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">👤</div>
            <span className="text-xs font-bold text-gray-800">{user?.username || 'Redditor'}</span>
          </div>
        </div>
      )}

      {/* Bookmarks Widget */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm space-y-3">
        <h4 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Community Bookmarks</h4>
        <div className="space-y-1.5">
          <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 rounded-full flex items-center justify-between transition-all">
            <span>Wiki</span>
          </button>
          <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 rounded-full flex items-center justify-between transition-all">
            <span>Megathreads</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}