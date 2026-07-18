// pages/components/CommunityHighlights.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CommunityHighlights({ communityName }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4">
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                <Sparkles size={12} />
                <span>Community highlights</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <span className="text-[9px] font-extrabold text-orange-600 tracking-wider uppercase">Announcement</span>
                    <h4 className="text-xs font-bold text-gray-900 mt-1 leading-normal line-clamp-2">
                        NO DUPLICATE POSTS - 24 HOUR BANS WILL BE IN EFFECT
                    </h4>
                </div>
                <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <span className="text-[9px] font-extrabold text-emerald-600 tracking-wider uppercase">Daily Thread</span>
                    <h4 className="text-xs font-bold text-gray-900 mt-1 leading-normal line-clamp-2">
                        {communityName} Daily Discussions
                    </h4>
                </div>
            </div>
        </div>
    );
}