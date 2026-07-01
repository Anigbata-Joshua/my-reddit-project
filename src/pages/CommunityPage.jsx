import { useParams } from 'react-router-dom';
import PostList from '../components/post/PostList';
import { posts, communities } from '../data/mockData';

export default function CommunityPage() {
  const { communityName } = useParams();
  const community = communities.find((c) => c.name === communityName);
  const communityPosts = posts.filter((p) => p.communityId === community?.id);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h1 className="m-0 mb-1 text-2xl text-gray-900">r/{communityName}</h1>
        <p className="text-sm text-gray-900">{community?.description}</p>
        <p className="text-xs text-gray-500">{community?.memberCount?.toLocaleString()} members</p>
      </div>
      <PostList posts={communityPosts} />
    </>
  );
}
