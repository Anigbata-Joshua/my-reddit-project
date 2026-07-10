import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/post/PostList';
import { usePostStore } from '../store/postStore';
import { useCommunityStore } from '../store/communityStore';
import { useAuthStore } from '../store/authstore';

export default function CommunityPage() {
  const { communityName } = useParams();
  const { posts, loading, fetchPosts } = usePostStore();
  const { communities, fetchCommunities, joinCommunity, leaveCommunity, joinedCommunities } = useCommunityStore();
  const hasJoined = joinedCommunities.includes(communityName);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPosts();
    if (communities.length === 0) fetchCommunities();
  }, [communityName]);

  const community = communities.find((c) => c.name === communityName);
  const communityId = community?.communityId;

  const communityPosts = communityId
    ? posts.filter((p) => p.communityId === communityId)
    : posts.filter((p) => p.communityId === communityName);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="m-0 text-2xl text-gray-900">r/{communityName}</h1>

          {user && (
            hasJoined ? (
              <button
                onClick={() => leaveCommunity(communityName)}
                className="px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full hover:bg-red-50 hover:text-red-600 cursor-pointer"
              >
                Leave
              </button>
            ) : (
              <button
                onClick={() => joinCommunity(communityName)}
                className="px-4 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-full hover:bg-orange-700 cursor-pointer"
              >
                Join
              </button>
            )
          )}
        </div>
        {community?.description && (
          <p className="text-sm text-gray-700 mt-2">{community.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          {community?.memberCount === 1 ? '1 member' : `${community?.memberCount?.toLocaleString() || 0} members`}        </p>
      </div>

      {loading && communityPosts.length === 0 ? (
        <p className="text-gray-500 p-4">Loading posts…</p>
      ) : communityPosts.length === 0 ? (
        <p className="text-gray-500 p-4">No posts in this community yet.</p>
      ) : (
        <PostList posts={communityPosts} />
      )}
    </>
  );
}