import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import VoteButtons from '../../../shared/VoteButtons';
import { Award, MessageCircle, Share2Icon } from 'lucide-react';

export default function PostDetail({ post, communityName }) {
  const body = post?.body ?? post?.content;

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

      <div className='flex items-center px-4 pb-3 gap-2'>
        <VoteButtons
          votes={post.voteCount ?? 0}
          targetId={post.postId}
          targetType="post"
        />
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