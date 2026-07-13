import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../../store/authstore';
import { usePostStore } from '../../../store/postStore';
import { useCommunityStore, getCommunityName } from '../../../store/communityStore';
import api from '../../../services/api'
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import {
  Share2, Eye, Shirt, Shield, Plus, SlidersHorizontal,
  MoreHorizontal, Pencil, Bookmark, Trash2, Megaphone, BellOff, User
} from 'lucide-react';
import VoteButtons from '../../../shared/VoteButtons';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const { user, updateUser } = useAuthStore();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const tabs = [
    { label: 'Overview' }, { to: "", label: 'Posts' }, { label: 'Comments' },
    { label: 'Saved' }, { label: 'History' }, { label: 'Hidden' },
    { label: 'Upvoted' }, { label: 'Downvoted' }
  ];

  const { communities, fetchCommunities } = useCommunityStore();
  const { posts, loading, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
    if (communities.length === 0) fetchCommunities();
  }, [fetchPosts, fetchCommunities, communities.length]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await api.post('/users/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      updateUser({ avatar: response.data.avatar });
    } catch (error) {
      console.error('Avatar upload failed:', error.message);
    }
  };

  // Filter posts created by this specific user
  const userPosts = posts?.filter((p) => p.author === user?.username) || [];
  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans antialiased selection:bg-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* LEFT CONTENT FEED */}
          <div className="lg:col-span-2 space-y-4">

            {/* User Metadata Header Area */}
            <div className="flex items-center gap-3 pl-2">
              <div
                className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100 cursor-pointer relative"
                onClick={() => fileInputRef.current.click()}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl">🤖</div>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">{user?.username}</h1>
                <p className="text-xs text-gray-500 font-medium">u/{user?.username}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 flex gap-1 overflow-x-auto scrollbar-none pb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors duration-150 ${activeTab === tab.label ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Context Bar */}
            <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <Eye size={14} className="text-gray-500" />
                <span>Showing all content</span>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/createpost">
                  <button className="flex items-center gap-1.5 text-xs font-bold bg-gray-100 rounded-full px-3 py-1.5 hover:bg-gray-200 transition-colors">
                    <Plus size={14} /> Create Post
                  </button>
                </Link>
                <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                  <SlidersHorizontal size={14} />
                </button>
              </div>
            </div>

            {/* Loading / Post Lists States */}
            {loading ? (
              <div className="text-center py-20 text-xs font-medium text-gray-500">Loading feeds...</div>
            ) : userPosts.length > 0 && (activeTab === 'Overview' || activeTab === 'Posts') ? (
              <div className="space-y-3">
                {userPosts.map((postItem) => {
                  // Find the community name for this specific post
                  const communityName = getCommunityName(communities, postItem.communityId) || 'Unknown';

                  return (
                    <div key={postItem.postId} className="relative p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
                        <span className="font-bold text-gray-900 hover:underline cursor-pointer">
                          r/{communityName}
                        </span>
                        <span>•</span>
                        <span>Posted by u/{user?.username || 'Ajbrandy22'}</span>
                        <span>{postItem.createdAt ? formatDistanceToNow(new Date(postItem.createdAt)) : '8 hr.'} ago</span>
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">{postItem.title}</h3>
                      <p className="text-xs text-gray-700 mb-3">{postItem.body || postItem.content}</p>

                      {/* Action Row */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 font-bold">
                        <VoteButtons
                          votes={postItem.voteCount ?? 0}
                          targetId={postItem.postId}
                          targetType="post"
                        />
                        <button className="hover:bg-gray-100 px-2 py-1 rounded-full transition-colors">Reply</button>
                        <button className="hover:bg-gray-100 px-2 py-1 rounded-full transition-colors flex items-center gap-1"><Share2 size={12} /> Share</button>

                        {/* Dropdown Opener Button */}
                        <div className="relative">
                          <button
                            onClick={(e) => toggleDropdown(postItem.postId, e)}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                          >
                            <MoreHorizontal size={14} />
                          </button>

                          {/* Interactive Absolute Popup Options Menu Modal */}
                          {openDropdownId === postItem.postId && (
                            <div
                              ref={dropdownRef}
                              className="absolute left-0 mt-1 w-52 bg-white rounded-lg border border-gray-200 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100"
                            >
                              <DropdownItem icon={<Pencil size={14} />} label="Edit comment" />
                              <DropdownItem icon={<Bookmark size={14} />} label="Save" />
                              <DropdownItem icon={<Trash2 size={14} />} label="Delete comment" danger />
                              <DropdownItem icon={<Megaphone size={14} />} label="Mark as brand affiliate" />
                              <DropdownItem icon={<BellOff size={14} />} label="Turn off reply notifications" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-2xl mb-3 border border-gray-100">
                  👽
                </div>
                <h2 className="text-base font-bold mb-1">{`You don't have any ${activeTab.toLowerCase()} yet`}</h2>
                <p className="text-xs text-gray-500 max-w-xs mb-4 leading-relaxed">
                  Once you post to a community, it'll show up here.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR PANEL */}
          <div className="space-y-4 lg:sticky lg:top-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="h-16 bg-gray-900 relative" />

              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start -mt-10 relative z-10">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-sm cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xl">🤖</div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-gray-900">{user?.username || 'Ajbrandy22'}</h2>
                  <button className="mt-2 flex items-center gap-1.5 text-xs font-bold bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors">
                    <Share2 size={12} /> Share
                  </button>
                </div>

                <div className="text-xs text-gray-500 font-semibold">0 followers</div>

                <div className="grid grid-cols-2 gap-y-4 border-b border-gray-100 pb-4">
                  <div>
                    <div className="text-xs font-bold text-gray-900">{userPosts.length}</div>
                    <div className="text-[10px] font-medium text-gray-500">Karma</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">0</div>
                    <div className="text-[10px] font-medium text-gray-500">Contributions</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      {user?.createdAt ? formatDistanceToNow(new Date(user.createdAt)) : "1 w"}
                    </div>
                    <div className="text-[10px] font-medium text-gray-500">Reddit Age</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 flex items-center gap-0.5">
                      <span>🧭 1</span>
                    </div>
                    <div className="text-[10px] font-medium text-gray-500">Active in &gt;</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">0</div>
                    <div className="text-[10px] font-medium text-gray-500">Gold earned</div>
                  </div>
                </div>

                {/* Achievements Layer */}
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Achievements</span>
                    <button className="text-xs font-bold text-gray-600 hover:underline">View All</button>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <div className="flex -space-x-1 shrink-0">
                      <span className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center text-[10px] border border-white">🍌</span>
                      <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-[10px] border border-white">👶</span>
                    </div>
                    <div className="text-[10px] leading-tight min-w-0">
                      <span className="font-bold text-gray-800 block truncate">Banana Baby, Banana Beginner</span>
                      <span className="text-gray-400 font-medium truncate block">Feed Finder, +3 more</span>
                    </div>
                  </div>
                </div>

                {/* Settings Layout */}
                <div className="space-y-3.5 pb-2">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block">Settings</span>
                  <SettingRow icon={<User size={14} />} title="Profile" desc="Customize your profile" />
                  <SettingRow icon={<Eye size={14} />} title="Curate your profile" desc="Manage what people see when they visit" />
                  <SettingRow icon={<Shirt size={14} />} title="Avatar" desc="Style your avatar" />
                  <SettingRow icon={<Shield size={14} />} title="Mod Tools" desc="Moderate your profile" />
                </div>

                <div className="pt-1">
                  <button className="w-full py-1.5 border border-dashed border-gray-300 hover:border-gray-400 text-xs font-bold rounded-full flex items-center justify-center gap-1 text-gray-600 transition-colors">
                    <Plus size={12} /> Add Social Link
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

function DropdownItem({ icon, label, danger }) {
  return (
    <button className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs font-medium hover:bg-gray-50 transition-colors ${danger ? 'text-gray-900' : 'text-gray-800'
      }`}>
      <span className="text-gray-500 shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function SettingRow({ icon, title, desc }) {
  return (
    <div className="flex items-center justify-between gap-3 group">
      <div className="flex items-start gap-2.5 min-w-0">
        <div className="text-gray-500 mt-0.5 shrink-0">{icon}</div>
        <div className="min-w-0 leading-normal">
          <h4 className="text-[11px] font-bold text-gray-800 truncate">{title}</h4>
          <p className="text-[10px] text-gray-400 truncate">{desc}</p>
        </div>
      </div>
      <button className="text-[11px] font-bold bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full text-black transition-colors shrink-0">
        Update
      </button>
    </div>
  );
}