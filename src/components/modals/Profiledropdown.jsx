import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authstore';
import {
    User, Shield, LogOut, Settings,
    Award, FileText, Shirt, DollarSign,
    MousePointerClick, ClockFading, Sun, LogIn
} from 'lucide-react';
import Avatar from '../shared/Avatar';

export default function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        function handleEvents(event) {
            if (event.type === 'mousedown') {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            } else if (event.type === 'keydown' && event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleEvents);
        document.addEventListener('keydown', handleEvents);

        return () => {
            document.removeEventListener('mousedown', handleEvents);
            document.removeEventListener('keydown', handleEvents);
        };
    }, []);

    return (
        <div className="relative inline-block text-left ml-2" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="group relative flex items-center gap-2 p-1.5 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-black focus:outline-none"
            >
                {user ? (
                    <Avatar className="w-9 h-9 rounded-full object-cover" />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
                        <User size={18} />
                    </div>
                )}

                {/* Floating Tooltip */}
                {!isOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-gray-900 text-white text-[10px] rounded px-2.5 py-1 whitespace-nowrap shadow-md
                                    opacity-0 translate-y-1 scale-95 pointer-events-none
                                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 
                                    transition-all duration-200 ease-out">
                        {user ? 'User Profile' : 'Settings Menu'}
                    </div>
                )}
            </button>

            {/* Floating Menu Pop-up */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 max-w-sm sm:w-64 bg-white border border-gray-200 text-black rounded-xl shadow-lg z-50 overflow-hidden transform origin-top-right transition-all">

                    {/* DYNAMIC HEADER BASED ON AUTH */}
                    {user ? (
                        <>
                            <Link to='/profile'
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <Avatar className="w-10 h-10 rounded-full object-cover shrink-0" />
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-black truncate">View Profile</div>
                                    <div className="text-xs text-gray-500 truncate">u/{user?.username}</div>
                                </div>
                            </Link>
                            <hr className="border-gray-100" />
                        </>
                    ) : (
                        <>
                            <div className="p-4 space-y-2">
                                <p className="text-xs text-gray-500 leading-normal">Log in to view your profile, manage dashboards, and customize avatars.</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => { setIsOpen(false); navigate('/login'); }}
                                        className="py-1.5 px-3 bg-gray-100 hover:bg-gray-200 font-semibold text-xs rounded-full transition-colors text-center"
                                    >
                                        Log In
                                    </button>
                                    <button 
                                        onClick={() => { setIsOpen(false); navigate('/signup'); }}
                                        className="py-1.5 px-3 bg-black hover:bg-gray-800 text-white font-semibold text-xs rounded-full transition-colors text-center"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                            <hr className="border-gray-100" />
                        </>
                    )}

                    {/* Interactive Menu Items */}
                    <div className="p-1.5 space-y-0.5">
                        {user && (
                            <>
                                <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light">
                                    <Shirt size={18} className="text-gray-700 shrink-0" />
                                    <span>Edit Avatar</span>
                                </Link>

                                <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light">
                                    <FileText size={18} className="text-gray-700 shrink-0" />
                                    <span>Drafts</span>
                                </Link>

                                <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-start gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left">
                                    <Award size={18} className="text-gray-700 mt-0.5 shrink-0" />
                                    <div className="leading-tight">
                                        <div className="font-light">Achievements</div>
                                        <span className="text-xs text-gray-500 mt-0.5 block">6 unlocked</span>
                                    </div>
                                </Link>

                                <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-start gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left">
                                    <DollarSign size={18} className="text-gray-700 mt-0.5 shrink-0" />
                                    <div className="leading-tight">
                                        <div className="font-light">Earn</div>
                                        <span className="text-xs text-gray-500 mt-0.5 block">Earn cash on platform</span>
                                    </div>
                                </Link>

                                <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light">
                                    <Shield size={18} className="text-gray-700 shrink-0" />
                                    <span>Premium</span>
                                </Link>
                            </>
                        )}

                        <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light">
                            <Sun size={18} className="text-gray-700 shrink-0" />
                            <span>Display Mode</span>
                        </Link>

                        {user ? (
                            <button 
                                onClick={() => { logout(); setIsOpen(false); navigate('/signup'); }} 
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light cursor-pointer"
                            >
                                <LogOut size={18} className="text-gray-700 shrink-0" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light">
                                <LogIn size={18} className="text-gray-700 shrink-0" />
                                <span>Log In / Sign Up</span>
                            </Link>
                        )}
                    </div>

                    <hr className="border-gray-100" />

                    {/* Bottom Meta Items */}
                    <div className="p-1.5 space-y-0.5">
                        <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light">
                            <MousePointerClick size={18} className="text-gray-700 shrink-0" />
                            <span>Advertise on Reddit</span>
                        </Link>

                        <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light">
                            <ClockFading size={18} className="text-gray-700 shrink-0" />
                            <span className="text-sm">Try Reddit Pro <span className='text-[11px] font-bold text-red-600 ml-1'>BETA</span></span>
                        </Link>

                        <hr className="border-gray-100" />

                        <Link to="#" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left font-light">
                            <Settings size={18} className="text-gray-700 shrink-0" />
                            <span>Settings</span>
                        </Link>
                    </div>

                </div>
            )}
        </div>
    );
}