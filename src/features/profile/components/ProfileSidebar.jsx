import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Share2, Eye, Shirt, Shield, Plus, User } from 'lucide-react';

export default function ProfileSidebar({ user, userPostsLength, createdAt }) {
    return (
        <div className="space-y-4 lg:sticky lg:top-4">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="h-18 bg-linear-to-r from-slate-900 via-slate-800 to-gray-700" />

                <div className="space-y-4 p-4">
                    <div className="relative z-10 -mt-8 flex items-start justify-between">
                        {/* Added cursor-pointer and hover styling to the avatar container */}
                        <div className="h-14 w-14 cursor-pointer overflow-hidden rounded-full border-4 border-white shadow-sm transition-opacity hover:opacity-90">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="avatar" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xl">🤖</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-gray-900">{user?.username || 'Ajbrandy22'}</h2>
                        <button className="mt-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-200">
                            <Share2 size={12} /> Share
                        </button>
                    </div>

                    <div className="text-xs font-semibold text-gray-500">0 followers</div>

                    <div className="grid grid-cols-2 gap-y-4 border-b border-gray-100 pb-4">
                        <div>
                            <div className="text-xs font-bold text-gray-900">{userPostsLength}</div>
                            <div className="text-[10px] font-medium text-gray-500">Karma</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-900">0</div>
                            <div className="text-[10px] font-medium text-gray-500">Contributions</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-900">
                                {createdAt && !isNaN(new Date(createdAt).getTime())
                                    ? `${formatDistanceToNow(new Date(createdAt))} ago`
                                    : "Joined recently"}
                            </div>
                            <div className="text-[10px] font-medium text-gray-500">Reddit Age</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-0.5 text-xs font-bold text-gray-900">
                                <span>🧭 1</span>
                            </div>
                            <div className="text-[10px] font-medium text-gray-500">Active in &gt;</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-900">0</div>
                            <div className="text-[10px] font-medium text-gray-500">Gold earned</div>
                        </div>
                    </div>

                    <div className="border-b border-gray-100 pb-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Achievements</span>
                            <button className="text-xs font-bold text-gray-600 hover:underline">View All</button>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
                            <div className="flex shrink-0 -space-x-1">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-yellow-100 text-[10px]">🍌</span>
                                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-orange-100 text-[10px]">👶</span>
                            </div>
                            <div className="min-w-0 text-[10px] leading-tight">
                                <span className="block truncate font-bold text-gray-800">Banana Baby, Banana Beginner</span>
                                <span className="block truncate font-medium text-gray-400">Feed Finder, +3 more</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3.5 pb-2">
                        <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">Settings</span>
                        <SettingRow icon={<User size={14} />} title="Profile" desc="Customize your profile" />
                        <SettingRow icon={<Eye size={14} />} title="Curate your profile" desc="Manage what people see when they visit" />
                        <SettingRow icon={<Shirt size={14} />} title="Avatar" desc="Style your avatar" />
                        <SettingRow icon={<Shield size={14} />} title="Mod Tools" desc="Moderate your profile" />
                    </div>

                    <div className="pt-1">
                        <button className="flex w-full items-center justify-center gap-1 rounded-full border border-dashed border-gray-300 px-3 py-1.5 text-xs font-bold text-gray-600 transition-colors hover:border-gray-400">
                            <Plus size={12} /> Add Social Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingRow({ icon, title, desc }) {
    return (
        <div className="flex items-center justify-between gap-3 group">
            <div className="flex min-w-0 items-start gap-2.5">
                <div className="mt-0.5 shrink-0 text-gray-500">{icon}</div>
                <div className="min-w-0 leading-normal">
                    <h4 className="truncate text-[11px] font-bold text-gray-800">{title}</h4>
                    <p className="truncate text-[10px] text-gray-400">{desc}</p>
                </div>
            </div>
            <button className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-black transition-colors hover:bg-gray-200">
                Update
            </button>
        </div>
    );
}