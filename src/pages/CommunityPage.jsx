import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/post/PostList';
import { usePostStore } from '../store/postStore';
import { useCommunityStore } from '../store/communityStore';

export default function CommunityPage() {
  const { communityName } = useParams();
  const { posts, loading, fetchPosts } = usePostStore();
  const { communities, fetchCommunities } = useCommunityStore();

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
    if (communities.length === 0) fetchCommunities();
  }, [posts.length, communities.length, fetchPosts, fetchCommunities]);

  // The URL param is the community's human name (e.g. "Streetwear").
  // Find the matching community object, then filter posts by its `communityId`.
  const community = communities.find((c) => c.name === communityName);
  const communityId = community?.communityId;

  const communityPosts = communityId
    ? posts.filter((p) => p.communityId === communityId)
    : posts.filter((p) => p.communityId === communityName);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h1 className="m-0 mb-1 text-2xl text-gray-900">r/{communityName}</h1>
        {community?.description && (
          <p className="text-sm text-gray-700 mt-2">{community.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          {community?.memberCount?.toLocaleString() || 0} members · {communityPosts.length} posts
        </p>
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