import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authstore';
import { usePostStore } from '../store/postStore';
import api from '../utils/api';

import {
  Share2, Award, User, Eye, Shirt, Shield, Plus, SlidersHorizontal
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = [{label:'Overview'}, {label:'Posts'}, {label:'Comments'}, {label:'Saved'}, {label:'History'},  {label:'Upvoted'},{ label:'Downvoted'}];

  const { user } = useAuthStore();
  const { posts, loading, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts created by this specific user. The backend uses `author` for the post's user id
  const userPosts = posts?.filter((p) => p.author && user && p.author === user?.userId) || [];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-gray-200">
      {/* FIXED: Changed max-w-350 to standard layout constraints */}
      <div className="max-w-[1400px] mx-auto px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          <div className="lg:col-span-2 space-y-6">

            {/* User Title Meta Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-full flex items-center justify-center text-2xl font-bold border border-gray-200 shadow-sm shrink-0">
                Dp
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{user?.username || 'Anonymous'}</h1>
                <p className="text-sm text-gray-500 font-medium">u/{user?.username || 'username'}</p>
              </div>
            </div>

            {/* Scrollable Navigation Tabs */}
            <div className="border-b border-gray-100 overflow-x-auto scrollbar-none flex gap-1">
              {tabs.map((tab) => (
                <Link to="#"
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-150 ${
                    activeTab === tab.label ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  {tab.label}
                </Link>
              ))}
            </div>

            {/* Filter Sub-bar */}
            <div className="flex items-center justify-between bg-gray-50/70 rounded-xl px-4 py-2.5 border border-gray-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <Eye size={14} />
                <span>Showing all content</span>
              </div>
              <Link to="/" className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs font-medium bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm hover:bg-gray-50">
                  <Plus size={14} /> Create Post
                </button>
                <button className="p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 text-gray-600">
                  <SlidersHorizontal size={14} />
                </button>
              </Link>
            </div>

            {/* Loading Indicator */}
            {loading ? (
              <div className="text-center py-20 text-sm text-gray-500">Loading posts...</div>
            ) : userPosts.length > 0 && (activeTab === 'Overview' || activeTab === 'Posts') ? (
              <div className="space-y-4">
                {/* FIXED: References now target postItem rather than parent array context */}
                {userPosts.map((postItem) => (
                  <div key={postItem.postId} className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors bg-white shadow-sm">
                    <h3 className="font-semibold text-base mb-1 text-gray-900">{postItem.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{postItem.body || postItem.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State Feed Component */
              <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-4 border border-gray-100 animate-pulse">
                  👽
                </div>
                <h2 className="text-xl font-bold mb-1">{`You don't have any ${activeTab.toLowerCase()}  yet`}</h2>
                <p className="text-sm text-gray-500 max-w-sm mb-5 leading-relaxed">
                  Once you post to a community, it'll show up here. If you'd rather hide your posts, update your settings.
                </p>
                <button className="bg-black hover:bg-gray-800 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-all shadow-sm">
                  Update Settings
                </button>
              </div>
            )}

          </div>

          {/* RIGHT PANEL: Sticky Information Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-4">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="h-16 bg-black relative">
                <button className="absolute bottom-3 right-3 p-1.5 bg-black/40 text-white hover:bg-black/60 rounded-full backdrop-blur-sm transition-colors">
                  <Eye size={14} />
                </button>
              </div>

              <div className="p-4 space-y-5">
                <div>
                  <h2 className="text-base font-bold">{user?.username || 'Anonymous'}</h2>
                  <button className="mt-2 flex items-center gap-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors">
                    <Share2 size={12} /> Share
                  </button>
                </div>

                <div className="text-xs text-gray-500 font-medium">0 followers</div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-b border-gray-100 pb-5">
                  <div>
                    <div className="text-sm font-semibold">{userPosts.length}</div>
                    <div className="text-[11px] text-gray-500">Post Karma</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">0</div>
                    <div className="text-[11px] text-gray-500">Contributions</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">1 w</div>
                    <div className="text-[11px] text-gray-500">Reddit Age</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">0</div>
                    <div className="text-[11px] text-gray-500">Active in &gt;</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">0</div>
                    <div className="text-[11px] text-gray-500">Gold earned</div>
                  </div>
                </div>

                {/* Achievements Badge Layer */}
                <div className="border-b border-gray-100 pb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">Achievements</span>
                    <button className="text-xs font-semibold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="flex -space-x-1">
                      <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs border border-white">🍌</span>
                      <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs border border-white">👶</span>
                    </div>
                    <div className="text-[11px] leading-tight">
                      <span className="font-semibold block text-gray-800">Banana Baby, Banana Beginner</span>
                      <span className="text-gray-500 font-medium">Feed Finder, +3 more</span>
                    </div>
                  </div>
                </div>

                {/* Settings Actions Layout Options */}
                <div className="space-y-4 pb-4">
                  <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase block">Settings</span>
                  <SettingRow icon={<User size={16} />} title="Profile" desc="Customize your profile" />
                  <SettingRow icon={<Eye size={16} />} title="Curate your profile" desc="Manage what people see when they visit" />
                  <SettingRow icon={<Shirt size={16} />} title="Avatar" desc="Style your avatar" />
                  <SettingRow icon={<Shield size={16} />} title="Mod Tools" desc="Moderate your profile" />
                </div>

                <div className="pt-2">
                  <button className="w-full py-2 border border-dashed border-gray-300 hover:border-gray-400 text-xs font-semibold rounded-full flex items-center justify-center gap-1 text-gray-600 transition-colors">
                    <Plus size={14} /> Add Social Link
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function SettingRow({ icon, title, desc }) {
  return (
    <div className="flex items-center justify-between gap-3 group">
      <div className="flex items-start gap-3 min-w-0">
        <div className="text-gray-500 mt-0.5 shrink-0 group-hover:text-black transition-colors">{icon}</div>
        <div className="min-w-0 leading-snug">
          <h4 className="text-xs font-semibold text-gray-900 truncate">{title}</h4>
          <p className="text-[11px] text-gray-500 truncate">{desc}</p>
        </div>
      </div>
      <button className="text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full text-black transition-colors shrink-0">
        Update
      </button>
    </div>
  );
}