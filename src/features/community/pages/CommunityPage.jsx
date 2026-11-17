// features/community/pages/CommunityPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SquarePlus } from 'lucide-react';
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
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-4xl mb-3">👽</div>
                <h3 className="text-base font-bold text-gray-900 mb-1">No posts in r/{communityName} yet</h3>
                <p className="text-xs text-gray-500 mb-5">Be the first to share something with this community.</p>
                <Link
                  to="/createpost"
                  className="flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-700"
                >
                  <SquarePlus size={16} />
                  <span>Create Post</span>
                </Link>
              </div>
            )}
          </div>

          {/* About community widget */}
          <CommunityAbout community={community} communityName={communityName} user={user} />

        </div>
      </main>

    </div>
  );
}