import { useEffect, useState,  } from 'react';
import { usePostStore } from '../../../store/postStore';
import { useCommunityStore } from '../../../store/communityStore';
import PostList from '../../posts/components/PostList';

export default function Home() {
const { posts, loading, fetchPosts } = usePostStore();
const { fetched: communitiesFetched, fetchCommunities } = useCommunityStore();
const [tab, setTab] = useState('forYou');
useEffect(() => {
    fetchPosts();
    if (!communitiesFetched) fetchCommunities();
}, []);

  const tabClass = (active) =>
    `font-bold text-sm py-2 border-b-2 ${
      active ? 'text-gray-900 border-gray-900' : 'text-gray-500 border-transparent'
    }`;

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading posts...</p>

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg flex items-center px-4 mb-3 h-12 gap-5">
        <button className={tabClass(tab === 'forYou')} onClick={() => setTab('forYou')}>
          For You
        </button>
        <button className={tabClass(tab === 'following')} onClick={() => setTab('following')}>
          Following
        </button>
      </div>
      <PostList posts={posts} />
    </>
  );
}