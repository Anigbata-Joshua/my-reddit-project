import React from 'react';

export default function CommunityPreview({ name, description }) {
    const displayName = name.trim() || 'communityname';
    const displayDescription = description.trim() || 'Your community description';

    return (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center min-h-[220px]">
            <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                    {/* Default Native Reddit Logo Badge */}
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shrink-0 border border-orange-700 shadow-sm">
                        <span className="text-white font-extrabold text-base italic leading-none select-none">
                            r/
                        </span>
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                            r/{displayName}
                        </h4>
                        <p className="text-[10px] font-bold text-gray-500 tracking-wide">
                            1 weekly visitor • 1 weekly contributor
                        </p>
                    </div>
                </div>

                <p className="text-xs text-gray-400 font-medium break-words leading-relaxed">
                    {displayDescription}
                </p>
            </div>
        </div>
    );
}