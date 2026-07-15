import { Link, useNavigate, useLocation } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import VoteButtons from '../../../shared/VoteButtons';
import { MessageCircle, Share2Icon } from 'lucide-react';
import { useAuthStore } from '../../../store/authstore'

export default function PostDetail({ post, communityName }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const body = post?.body ?? post?.content;

  // Intercept action if user is logged out
  const handleProtectedAction = (e) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      // Redirect to login while capturing the current post URL to return to
      navigate('/login', { state: { from: location.pathname } });
      return false;
    }
    return true;
  };

  return (
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

      {/* Actions Bar */}
      <div className='flex items-center px-4 pb-3 gap-2'>
        {/* Pass down the trigger or wrap in a click interceptor */}
        <div onClickCapture={(e) => !handleProtectedAction(e)}>
          <VoteButtons
            votes={post.voteCount ?? 0}
            targetId={post.postId}
            targetType="post"
            disabled={!user} // Let VoteButtons know internally if it should look/act disabled
          />
        </div>

        <div className="group relative inline-block">
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
            <MessageCircle size={16} /> {post.commentCount ?? 0}
          </button>
        </div>
        <div className="group relative inline-block ml-auto">
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
            <Share2Icon size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}