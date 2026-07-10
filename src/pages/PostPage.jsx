import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import VoteButtons from '../components/shared/VoteButtons';
import { usePostStore } from '../store/postStore';
import { useCommentStore } from '../store/commentsStore'; // Fixed path to match your commentStore file name
import { useCommunityStore, getCommunityName } from '../store/communityStore';
import { Award, MessageCircle, Share2Icon } from 'lucide-react';
import { useAuthStore } from '../store/authstore';

export default function PostPage() {
  const { postId } = useParams();
  const { posts, loading, fetchPosts } = usePostStore();
  const { communities, fetchCommunities } = useCommunityStore();

  const [commentBody, setCommentBody] = useState('');
  const { comments, fetchComments, addComment, deleteComment } = useCommentStore();
  const { user } = useAuthStore();


  const handleAddComment = async () => {
    if (!commentBody.trim()) return;
    await addComment(postId, commentBody);
    setCommentBody('');
  };

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
    if (communities.length === 0) fetchCommunities();
    fetchComments(postId);
  }, [postId, posts.length, communities.length, fetchPosts, fetchCommunities, fetchComments]);

  const post = posts.find((p) => p.postId === postId);
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
          <span>{post.createdAt ? formatDistanceToNow(new Date(post.createdAt)) : 'some time'} ago</span>
        </div>

        {/* Post Content */}
        <div className="px-4 pt-2 pb-3">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">{post.title}</h1>
          {body && <p className="text-sm text-gray-800 leading-relaxed">{body}</p>}
        </div>
        {post.image && (
          <img src={post.image} alt={post.title + ' image'} className="w-full max-h-96 object-contain bg-black rounded mb-3" />
        )}

        {/* Post Action Footer Toolbar with Hover Tooltips */}
        <div className='flex items-center px-4 pb-3 gap-2'>
          <VoteButtons
            votes={post.voteCount ?? 0}
            targetId={post.postId}
            targetType="post"
          />
          {/* Post Comments Tooltip Wrapper */}
          <div className="group relative inline-block">
            <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
              <MessageCircle size={16} /> {post.commentCount ?? 0}
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
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Comments ({comments.length})</h3>

        {/* Comment Form */}
        <div className="mb-4">
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-blue-400 resize-none"
          />
          <button
            onClick={handleAddComment}
            disabled={!commentBody.trim()}
            className={`mt-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${commentBody.trim()
              ? 'bg-red-700 text-white hover:bg-red-800 cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((c) => {
              const uniqueId = c?.commentId;
              return (
                <div key={uniqueId} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <span className="font-semibold text-gray-700">u/{c?.author || 'anonymous'}</span>
                    <span>·</span>
                    <span>{c?.createdAt ? formatDistanceToNow(new Date(c?.createdAt)) : 'just now'} ago</span>
                  </div>
                  <p className="text-sm text-gray-900 whitespace-pre-line">{c?.body}</p>
                  {user?.username === c?.author && (
                    <button
                      onClick={() => deleteComment(c.commentId)}
                      className="text-[11px] text-red-500 hover:text-red-700 font-semibold mt-1"
                    >
                      Delete
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-xs text-gray-400 py-4">No comments yet. Be the first to share your thoughts!</p>
          )}

        </div>
      </div>
    </>
  );
}