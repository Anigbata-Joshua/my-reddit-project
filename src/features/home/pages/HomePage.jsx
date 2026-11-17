import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SquarePlus } from 'lucide-react';
import { usePostStore } from '../../../store/postStore';
import { useCommunityStore } from '../../../store/communityStore';
import PostList from '../../posts/components/PostList';
import Loader from '../../../shared/Loader';

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

      {loading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-4xl mb-4">👽</div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">No posts yet</h2>
          <p className="text-sm text-gray-500 mb-6">Be the first to post something in a community.</p>
          <Link
            to="/createpost"
            className="flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
          >
            <SquarePlus size={18} />
            <span>Create Post</span>
          </Link>
        </div>
      ) : (
        <PostList posts={posts} />
      )}
    </>
  );
}