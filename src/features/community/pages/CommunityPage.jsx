// features/community/pages/CommunityPage.jsx
import React from 'react';
import PostList from '../../posts/components/PostList';
import Loader from '../../../shared/Loader';
import useCommunityPage from '../hook/useCommunityPage';
import CommunityBanner from '../components/CommunityBanner';
import CommunityHighlights from '../components/CommunityHighlights';
import CommunityAbout from '../components/CommunityAbout';

export default function CommunityPage() {
  const { communityName, community, communityPosts, loading, user, hasJoined, handleJoinToggle, handleBannerUpload } = useCommunityPage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">

      <main className="flex-1 overflow-y-auto">
        {/* Community Banner */}
        <CommunityBanner
          community={community}
          communityName={communityName}
          user={user}
          hasJoined={hasJoined}
          onJoinToggle={handleJoinToggle}
          onBannerUpload={handleBannerUpload}
        />

        <div className="max-w-300 mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <CommunityHighlights communityName={communityName} />
            <PostList posts={communityPosts} />
            {loading && communityPosts.length === 0 && <Loader />}
            {!loading && communityPosts.length === 0 && (
              <p className="text-gray-500 p-4 text-sm">No posts in this community yet.</p>
            )}
          </div>

          {/* About community widget */}
          <CommunityAbout community={community} communityName={communityName} user={user} />

        </div>
      </main>

    </div>
  );
}