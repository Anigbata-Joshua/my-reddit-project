import React from 'react';
import { useProfilePage } from '../hooks/useProfilePage';
import { getCommunityName } from '../../../store/communityStore';
import ProfileHeader from '../components/ProfileHeader';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileLoadingState from '../components/ProfileLoadingState';
import ProfileEmptyState from '../components/ProfileEmptyState';
import ProfilePostCard from '../components/ProfilePostCard';

export default function ProfilePage() {
  const { activeTab, setActiveTab, openDropdownId, dropdownRef, fileInputRef, tabs, user, uploadError, uploadSuccess, uploadingAvatar, loading, communities, userPosts, shouldShowPosts, toggleDropdown, handleAvatarUpload } = useProfilePage();

  return (
    <div className="min-h-screen bg-gray-50 text-black antialiased selection:bg-gray-200">
      <div className="mx-auto max-w-300 px-4 py-4 lg:px-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 cursor-pointer">

          <div className="space-y-4 lg:col-span-2">
            <ProfileHeader
              user={user}
              activeTab={activeTab}
              tabs={tabs}
              onTabChange={setActiveTab}
              onAvatarClick={() => fileInputRef.current?.click()}
              fileInputRef={fileInputRef}
              onAvatarUpload={handleAvatarUpload}
              onCreatePost={() => { }}
              uploadingAvatar={uploadingAvatar}
            />

            {uploadError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {uploadError}
              </div>
            )}

            {uploadSuccess && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                {uploadSuccess}
              </div>
            )}

            {loading ? (
              <ProfileLoadingState />
            ) : userPosts.length > 0 && shouldShowPosts ? (
              <div className="space-y-3">
                {userPosts.map((postItem) => {
                  const communityName = getCommunityName(communities, postItem.communityId) || 'Unknown';

                  return (
                    <ProfilePostCard
                      key={postItem.postId}
                      post={postItem}
                      communityName={communityName}
                      username={user?.username || 'Ajbrandy22'}
                      isOpen={openDropdownId === postItem.postId}
                      onToggle={toggleDropdown}
                      menuRef={dropdownRef}
                    />
                  );
                })}
              </div>
            ) : (
              <ProfileEmptyState activeTab={activeTab} />
            )}
          </div>

          <ProfileSidebar
            user={user}
            userPostsLength={userPosts.length}
            createdAt={user?.createdAt}
          />

        </div>
      </div>
    </div>
  );
}