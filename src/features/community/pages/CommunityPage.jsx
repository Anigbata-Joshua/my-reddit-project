import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../../posts/components/PostList';
import { usePostStore } from '../../../store/postStore';
import { useCommunityStore } from '../../../store/communityStore';
import { useAuthStore } from '../../../store/authstore';
import CommunityHeader from '../components/CommunityHeader';

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
      <CommunityHeader
        communityName={communityName}
        community={community}
        hasJoined={hasJoined}
        user={user}
        onJoin={() => joinCommunity(communityName)}
        onLeave={() => leaveCommunity(communityName)}
      />

      <PostList
        posts={communityPosts}
        isLoading={loading && communityPosts.length === 0}
        emptyMessage="No posts in this community yet."
      />
    </>
  );
}