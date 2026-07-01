import { useState } from 'react';
import PostList from '../components/post/PostList';
import { posts as mockPosts } from '../data/mockData';

export default function Home() {
  const [tab, setTab] = useState('forYou');

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
      <PostList posts={mockPosts} />
    </>
  );
}