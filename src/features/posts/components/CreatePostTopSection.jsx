import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCommunityStore } from '../../../store/communityStore';

export default function CreatePostTargetSelector({
    user,
    selectedTarget,
    onSelectTarget,
    onSelectCommunity,
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { communities } = useCommunityStore();

    useEffect(() => {
        const clickHandler = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', clickHandler);
        return () => document.removeEventListener('mousedown', clickHandler);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-800 transition-all hover:border-gray-300 hover:bg-gray-100 focus:outline-none"
            >
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 text-[10px] font-bold text-white">
                    r
                </div>
                <span className="max-w-45 truncate">{selectedTarget}</span>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
                <div className="absolute left-0 z-50 mt-1 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                    <button
                        type="button"
                        onClick={() => {
                            onSelectTarget?.(`u/${user?.username}`);
                            setIsDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        <span className="text-[10px] text-orange-500">u/</span>
                        <span>{user?.username || 'Your profile'}</span>
                    </button>

                    {communities.map((community) => (
                        <button
                            key={community.communityId}
                            type="button"
                            onClick={() => {
                                onSelectTarget?.(`r/${community.name}`);
                                onSelectCommunity?.(community.communityId);
                                setIsDropdownOpen(false);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <span className="text-[10px] text-blue-500">r/</span>
                            <span>{community.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}