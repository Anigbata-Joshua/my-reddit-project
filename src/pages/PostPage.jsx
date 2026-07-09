import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import VoteButtons from '../components/shared/VoteButtons';
import { usePostStore } from '../store/postStore';
import { useCommunityStore, getCommunityName } from '../store/communityStore';
import { Award, MessageCircle, Share2Icon } from 'lucide-react';

export default function PostPage() {
  const { postId } = useParams();
  const { posts, loading, fetchPosts } = usePostStore();
  const { communities, fetchCommunities } = useCommunityStore();

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
    if (communities.length === 0) fetchCommunities();
  }, [posts.length, communities.length, fetchPosts, fetchCommunities]);

  // The backend sometimes returns `postId`
  const post = posts.find((p) => (p.postId) === postId);
  const body = post?.body ?? post?.content;
  const communityName = post ? getCommunityName(communities, post.communityId) : '';

  if (loading && !post) {
    return <p className="text-gray-900 p-4 font-medium">Loading post…</p>;
  }

  if (!post) {
    return <p className="text-gray-900 p-4 font-medium">Post not found.</p>;
  }

  return (
    <>
      {/* Main Post Card */}
      <article className="bg-white border border-gray-200 rounded-lg mb-3">
        {/* Post Metadata Subheader */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 px-4 pt-3">
          <Link to={`/r/${communityName}`} className="font-bold text-gray-900 hover:underline">
            r/{communityName}
          </Link>
          <span>·</span>
          <span>Posted by u/{post.author}</span>
          <span>·</span>
          <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
        </div>

        {/* Post Content */}
        <div className="px-4 pt-2 pb-3">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">{post.title}</h1>
          {body && <p className="text-sm text-gray-800 leading-relaxed">{body}</p>}
        </div>

        {/* Post Action Footer Toolbar with Hover Tooltips */}
        <div className='flex items-center px-4 pb-3 gap-2'>
          <VoteButtons votes={post.voteCount} />

          {/* Post Comments Tooltip Wrapper */}
          <div className="group relative inline-block">
            <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
              <MessageCircle size={16} /> {post.commentCount}
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 scale-95 group-hover:scale-100 z-10 bg-gray-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap shadow-md">
              View Comments
            </div>
          </div>

          {/* Post Award Tooltip Wrapper */}
          <div className="group relative inline-block">
            <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200" aria-label="Award post">
              <Award size={16} />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 scale-95 group-hover:scale-100 z-10 bg-gray-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap shadow-md">
              Award Post
            </div>
          </div>

          {/* Post Share Tooltip Wrapper */}
          <div className="group relative inline-block">
            <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200" aria-label="Share post">
              <Share2Icon size={16} />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 scale-95 group-hover:scale-100 z-10 bg-gray-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap shadow-md">
              Share Post
            </div>
          </div>
        </div>
      </article>

      {/* Comments Feed Container */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-6">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Comments ({post.commentCount})</h3>
        <p className="text-xs text-gray-500">Comments aren't loaded from the API yet — wire this up when the comments endpoint is ready.</p>
      </div>
    </>
  );
}