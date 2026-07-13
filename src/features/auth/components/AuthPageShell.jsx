import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthPageShell({ children, onClose, closeTo = '/' }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white px-6 py-12 shadow-2xl transition-all sm:px-10">
                <Link
                    to={closeTo}
                    onClick={onClose}
                    className="absolute right-6 top-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
                    aria-label="Close modal"
                >
                    <svg className="h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>
                {children}
            </div>
        </div>
    );
}
