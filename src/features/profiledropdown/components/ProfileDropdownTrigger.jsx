import React from 'react';
import { User } from 'lucide-react';
import Avatar from '../../../shared/Avatar';

export default function ProfileDropdownTrigger({ user, isOpen, onToggle }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="group relative flex items-center gap-2 rounded-full p-1.5 text-black transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
        >
            {user ? (
                <div className="h-9 w-9 overflow-hidden rounded-full">
                    <Avatar src={user?.avatar} alt={user?.username ? `${user.username} avatar` : 'avatar'} className="h-9 w-9 rounded-full" />
                </div>
            ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-500">
                    <User size={18} />
                </div>
            )}

            {!isOpen && (
                <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded bg-gray-900 px-2.5 py-1 text-[10px] whitespace-nowrap text-white opacity-0 shadow-md transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                    {user ? 'User Profile' : 'Settings Menu'}
                </div>
            )}
        </button>
    );
}
