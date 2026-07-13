import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authstore';
import Avatar from '../../../shared/Avatar';
import { Award, ClockFading, DollarSign, FileText, LogIn, LogOut, MousePointerClick, Settings, Shield, Shirt, Sun, User } from 'lucide-react';
import ProfileDropdownItem from './ProfileDropdownItem';

export default function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const handleEvents = (event) => {
            if (event.type === 'mousedown' && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            } else if (event.type === 'keydown' && event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleEvents);
        document.addEventListener('keydown', handleEvents);
        return () => {
            document.removeEventListener('mousedown', handleEvents);
            document.removeEventListener('keydown', handleEvents);
        };
    }, []);

    return (
        <div className="relative ml-2 inline-block text-left" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} className="group relative flex items-center gap-2 rounded-full p-1.5 text-black transition-colors duration-200 hover:bg-gray-100 focus:outline-none">
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

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-72 max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white text-black shadow-lg sm:w-64">
                    {user ? (
                        <>
                            <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 transition-colors hover:bg-gray-100">
                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                    <Avatar src={user?.avatar} alt={user?.username ? `${user.username} avatar` : 'avatar'} className="h-10 w-10 rounded-full" />
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
                                    <button onClick={() => { setIsOpen(false); navigate('/login'); }} className="rounded-full bg-gray-100 px-3 py-1.5 text-center text-xs font-semibold transition-colors hover:bg-gray-200">Log In</button>
                                    <button onClick={() => { setIsOpen(false); navigate('/signup'); }} className="rounded-full bg-black px-3 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-gray-800">Sign Up</button>
                                </div>
                            </div>
                            <hr className="border-gray-100" />
                        </>
                    )}

                    <div className="space-y-0.5 p-1.5">
                        {user && (
                            <>
                                <ProfileDropdownItem onClick={() => setIsOpen(false)} icon={<Shirt size={18} className="shrink-0 text-gray-700" />}>Edit Avatar</ProfileDropdownItem>
                                <ProfileDropdownItem onClick={() => setIsOpen(false)} icon={<FileText size={18} className="shrink-0 text-gray-700" />}>Drafts</ProfileDropdownItem>
                                <ProfileDropdownItem onClick={() => setIsOpen(false)} variant="stacked" icon={<Award size={18} className="mt-0.5 shrink-0 text-gray-700" />}>
                                    <div className="leading-tight">
                                        <div className="font-light">Achievements</div>
                                        <span className="mt-0.5 block text-xs text-gray-500">6 unlocked</span>
                                    </div>
                                </ProfileDropdownItem>
                                <ProfileDropdownItem onClick={() => setIsOpen(false)} variant="stacked" icon={<DollarSign size={18} className="mt-0.5 shrink-0 text-gray-700" />}>
                                    <div className="leading-tight">
                                        <div className="font-light">Earn</div>
                                        <span className="mt-0.5 block text-xs text-gray-500">Earn cash on platform</span>
                                    </div>
                                </ProfileDropdownItem>
                                <ProfileDropdownItem onClick={() => setIsOpen(false)} icon={<Shield size={18} className="shrink-0 text-gray-700" />}>Premium</ProfileDropdownItem>
                            </>
                        )}

                        <ProfileDropdownItem onClick={() => setIsOpen(false)} icon={<Sun size={18} className="shrink-0 text-gray-700" />}>Display Mode</ProfileDropdownItem>
                        {user ? (
                            <ProfileDropdownItem onClick={() => { logout(); setIsOpen(false); navigate('/signup'); }} icon={<LogOut size={18} className="shrink-0 text-gray-700" />}>Logout</ProfileDropdownItem>
                        ) : (
                            <ProfileDropdownItem to="/login" onClick={() => setIsOpen(false)} icon={<LogIn size={18} className="shrink-0 text-gray-700" />}>Log In / Sign Up</ProfileDropdownItem>
                        )}
                    </div>

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
