import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authstore';
import { useClickOutside } from '../hooks/useClickOutside';
import Avatar from '../../../shared/Avatar';
import { ClockFading, MousePointerClick, Settings } from 'lucide-react';
import ProfileDropdownItem from './ProfileDropdownItem';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import ProfileDropdownTrigger from './ProfileDropdownTrigger';

export default function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    // Handle auto-closing when clicking outside or pressing Escape
    useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

    const closeAndNavigate = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="relative ml-2 inline-block text-left" ref={dropdownRef}>
            <ProfileDropdownTrigger user={user} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-72 max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white text-black shadow-lg sm:w-64">
                    {user ? (
                        <>
                            <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 transition-colors hover:bg-gray-100">
                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                    <Avatar src={user?.avatar} alt={user?.username ? `${user.username} avatar` : 'avatar'} className="h-10 w-10 rounded-full cursor-pointer" />
                                </div>
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-black">View Profile</div>
                                    <div className="truncate text-xs text-gray-500">u/{user?.username}</div>
                                </div>
                            </Link>
                            <hr className="border-gray-100" />
                        </>
                    ) : (
                        <>
                            <div className="space-y-2 p-4">
                                <p className="text-xs leading-normal text-gray-500">Log in to view your profile, manage dashboards, and customize avatars.</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => closeAndNavigate('/login')} className="rounded-full bg-gray-100 px-3 py-1.5 text-center text-xs font-semibold transition-colors hover:bg-gray-200 cursor-pointer">Log In</button>
                                    <button onClick={() => closeAndNavigate('/signup')} className="rounded-full bg-black px-3 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-gray-800 cursor-pointer">Sign Up</button>
                                </div>
                            </div>
                            <hr className="border-gray-100" />
                        </>
                    )}

                    <ProfileDropdownMenu user={user} onClose={() => setIsOpen(false)} onLogout={logout} navigate={navigate} />
                    <hr className="border-gray-100" />

                    <div className="space-y-0.5 p-1.5">
                        <ProfileDropdownItem onClick={() => setIsOpen(false)} icon={<MousePointerClick size={18} className="shrink-0 text-gray-700" />}>Advertise on Reddit</ProfileDropdownItem>
                        <ProfileDropdownItem onClick={() => setIsOpen(false)} icon={<ClockFading size={18} className="shrink-0 text-gray-700" />}>Try Reddit Pro <span className="ml-1 text-[11px] font-bold text-red-600">BETA</span></ProfileDropdownItem>
                        <hr className="border-gray-100" />
                        <ProfileDropdownItem onClick={() => setIsOpen(false)} icon={<Settings size={18} className="shrink-0 text-gray-700" />}>Settings</ProfileDropdownItem>
                    </div>
                </div>
            )}
        </div>
    );
}