import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
    Share2,
    MoreHorizontal,
    Pencil,
    Bookmark,
    Trash2,
    Megaphone,
    BellOff,
} from 'lucide-react';
import VoteButtons from '../../../shared/VoteButtons';

export default function ProfilePostCard({
    post,
    communityName,
    username,
    isOpen,
    onToggle,
    menuRef,
}) {
    return (
        <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-gray-300">
            <div className="mb-2 flex flex-wrap items-center gap-1 text-[11px] text-gray-500">
                <span className="cursor-pointer font-bold text-gray-900 hover:underline">r/{communityName}</span>
                <span>•</span>
                <span>Posted by u/{username}</span>
                <span>{post.createdAt ? formatDistanceToNow(new Date(post.createdAt)) : '8 hr.'} ago</span>
            </div>

            <h3 className="mb-1 text-sm font-semibold text-gray-900">{post.title}</h3>
            <p className="mb-3 text-xs leading-relaxed text-gray-700">{post.body || post.content}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-gray-500">
                <VoteButtons votes={post.voteCount ?? 0} targetId={post.postId} targetType="post" />
                <button className="rounded-full px-2 py-1 transition-colors hover:bg-gray-100">Reply</button>
                <button className="flex items-center gap-1 rounded-full px-2 py-1 transition-colors hover:bg-gray-100">
                    <Share2 size={12} /> Share
                </button>

                <div className="relative">
                    <button
                        type="button"
                        onClick={(e) => onToggle(post.postId, e)}
                        className="rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100"
                    >
                        <MoreHorizontal size={14} />
                    </button>

                    {isOpen && (
                        <div
                            ref={menuRef}
                            className="absolute left-0 z-50 mt-1 w-52 rounded-xl border border-gray-200 bg-white py-1 shadow-xl"
                        >
                            <DropdownItem icon={<Pencil size={14} />} label="Edit comment" />
                            <DropdownItem icon={<Bookmark size={14} />} label="Save" />
                            <DropdownItem icon={<Trash2 size={14} />} label="Delete comment" danger />
                            <DropdownItem icon={<Megaphone size={14} />} label="Mark as brand affiliate" />
                            <DropdownItem icon={<BellOff size={14} />} label="Turn off reply notifications" />
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

function DropdownItem({ icon, label, danger }) {
    return (
        <button
            type="button"
            className={`flex w-full items-center gap-3 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-gray-50 ${danger ? 'text-gray-900' : 'text-gray-800'
                }`}
        >
            <span className="shrink-0 text-gray-500">{icon}</span>
            <span className="truncate">{label}</span>
        </button>
    );
}
