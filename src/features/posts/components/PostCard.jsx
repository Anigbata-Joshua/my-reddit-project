import { Link } from 'react-router-dom';
import { MessageCircle, Share2Icon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import VoteButtons from '../../../shared/VoteButtons';
import { useCommunityStore, getCommunityName } from '../../../store/communityStore';
import { useAuthStore } from '../../../store/authstore';
import { usePostStore } from '../../../store/postStore';
import api from '../../../services/api';
import { useState } from 'react';


export default function PostCard({ post }) {
  // The backend  returns `postId`
  const linkId = post.postId;
  const body = post.body ?? post.content;
  const communities = useCommunityStore((s) => s.communities);
  const communityName = getCommunityName(communities, post.communityId);
  const { user } = useAuthStore();
  const { fetchPosts } = usePostStore();
  const [deleteError, setDeleteError] = useState('');


  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/post/${post.postId}`);
      await fetchPosts();
    } catch (error) {
      setDeleteError('Failed to delete post. Please try again.');
    }
  };

  return (
    <article className=" border border-gray-200 rounded-lg mb-3 overflow-hidden hover:border-gray-400">
      <div className="flex items-center gap-1.5 text-xs text-gray-500 px-4 pt-2.5">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
          {(communityName?.[0] || '?').toUpperCase()}
        </span>
        <Link to={`/r/${communityName}`} className="font-bold text-gray-900 hover:underline">
          r/{communityName}
        </Link>
        <span>·</span>
        <span>Posted by u/{post.author}</span>
        <span>·</span>
        <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
      </div>

      <div className="px-4 pt-1 pb-3">
        <Link to={`/post/${linkId}`}>
          <h2 className="text-lg font-semibold my-1 text-gray-900">{post.title}</h2>
        </Link>

        {body && <p className="text-sm text-gray-900 mb-3">{body}</p>}
        {post.image && (
          <div className="mb-3 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-xs">
            <img
              src={post.image}
              alt={`${post.title} image`}
              loading="lazy"
              decoding="async"
              className="block w-full max-h-[420px] object-cover transition-transform duration-300 hover:scale-[1.01]"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <VoteButtons votes={post.voteCount}
            targetId={post.postId}
            targetType="post" />
          <Link
            to={`/post/${linkId}`}
            className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200"
          >
            <MessageCircle size={16} /> {post.commentCount}
          </Link>
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
            <Share2Icon size={16} />
          </button>
          {user?.username === post.author && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 bg-red-50 text-red-600 rounded-full px-3 py-2 text-xs font-bold hover:bg-red-100 ml-auto"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
