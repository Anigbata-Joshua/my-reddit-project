import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileEmptyState({ activeTab }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-16 text-center shadow-sm">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-2xl">
                👽
            </div>
            <h2 className="mb-1 text-base font-bold text-gray-900">{`You don't have any ${activeTab.toLowerCase()} yet`}</h2>
            <p className="mb-4 max-w-xs text-xs leading-relaxed text-gray-500">
                Once you post to a community or share something new, it will show up here.
            </p>
            <Link
                to="/createpost"
                className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
            >
                Create your first post
            </Link>
        </div>
    );
}
