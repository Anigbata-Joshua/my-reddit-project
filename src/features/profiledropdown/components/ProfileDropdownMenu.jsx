import React from 'react';
import { Award, DollarSign, FileText, LogIn, LogOut, Shield, Shirt, Sun } from 'lucide-react';
import ProfileDropdownItem from './ProfileDropdownItem';

export default function ProfileDropdownMenu({ user, onClose, onLogout, navigate }) {
    return (
        <div className="space-y-0.5 p-1.5">
            {user && (
                <>
                    <ProfileDropdownItem onClick={onClose} icon={<Shirt size={18} className="shrink-0 text-gray-700" />}>Edit Avatar</ProfileDropdownItem>
                    <ProfileDropdownItem onClick={onClose} icon={<FileText size={18} className="shrink-0 text-gray-700" />}>Drafts</ProfileDropdownItem>
                    <ProfileDropdownItem onClick={onClose} variant="stacked" icon={<Award size={18} className="mt-0.5 shrink-0 text-gray-700" />}>
                        <div className="leading-tight">
                            <div className="font-light">Achievements</div>
                            <span className="mt-0.5 block text-xs text-gray-500">6 unlocked</span>
                        </div>
                    </ProfileDropdownItem>
                    <ProfileDropdownItem onClick={onClose} variant="stacked" icon={<DollarSign size={18} className="mt-0.5 shrink-0 text-gray-700" />}>
                        <div className="leading-tight">
                            <div className="font-light">Earn</div>
                            <span className="mt-0.5 block text-xs text-gray-500">Earn cash on platform</span>
                        </div>
                    </ProfileDropdownItem>
                    <ProfileDropdownItem onClick={onClose} icon={<Shield size={18} className="shrink-0 text-gray-700" />}>Premium</ProfileDropdownItem>
                </>
            )}

            <ProfileDropdownItem onClick={onClose} icon={<Sun size={18} className="shrink-0 text-gray-700" />}>Display Mode</ProfileDropdownItem>
            {user ? (
                <ProfileDropdownItem onClick={() => { onLogout(); onClose(); navigate('/signup'); }} icon={<LogOut size={18} className="shrink-0 text-gray-700" />}>Logout</ProfileDropdownItem>
            ) : (
                <ProfileDropdownItem to="/login" onClick={onClose} icon={<LogIn size={18} className="shrink-0 text-gray-700" />}>Log In / Sign Up</ProfileDropdownItem>
            )}
        </div>
    );
}
