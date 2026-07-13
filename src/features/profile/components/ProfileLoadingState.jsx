import React from 'react';

export default function ProfileLoadingState() {
    return (
        <div className="space-y-3">
            {[1, 2].map((item) => (
                <div key={item} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 h-3 w-24 animate-pulse rounded-full bg-gray-200" />
                    <div className="mb-2 h-4 w-3/4 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-3 w-full animate-pulse rounded-full bg-gray-100" />
                    <div className="mt-3 h-3 w-2/3 animate-pulse rounded-full bg-gray-100" />
                </div>
            ))}
        </div>
    );
}
