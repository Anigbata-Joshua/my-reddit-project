import { Link } from 'react-router-dom';
import { MessageSquare, ScreenShareIcon, Share2, Share2Icon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import VoteButtons from '../shared/VoteButtons';
import { communities } from '../../data/mockData';

export default function PostCard({ post }) {
  const community = communities.find((c) => c.id === post.communityId);

  return (
    <article className=" border border-gray-200 rounded-lg mb-3 overflow-hidden hover:border-gray-400">
      <div className="flex items-center gap-1.5 text-xs text-gray-500 px-4 pt-2.5">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
          {community?.name[0].toUpperCase()}
        </span>
        <Link to={`/r/${community?.name}`} className="font-bold text-gray-900 hover:underline">
          r/{community?.name}
        </Link>
        <span>·</span>
        <span>Posted by u/{post.author}</span>
        <span>·</span>
        <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
      </div>

      <div className="px-4 pt-1 pb-3">
        <Link to={`/post/${post.id}`}>
          <h2 className="text-lg font-semibold my-1 text-gray-900">{post.title}</h2>
        </Link>

        {post.body && <p className="text-sm text-gray-900 mb-3">{post.body}</p>}
        {post.image && (
          <img src={post.image} alt="" className="w-full max-h-128 object-contain bg-black rounded mb-3" />
        )}

        <div className="flex items-center gap-2">
          <VoteButtons votes={post.votes} />
          <Link
            to={`/post/${post.id}`}
            className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200"
          >
            <MessageSquare size={16} /> {post.commentCount} Comments
          </Link>
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
            <Share2Icon size={16} /> Share
          </button>
        </div>
      </div>
    </article>
  );
}
