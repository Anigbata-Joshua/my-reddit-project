import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Layout from '../components/layout/Layout';
import VoteButtons from '../components/shared/VoteButtons';
import { posts, comments, communities } from '../data/mockData';
import { Award, MessageCircle, MessageSquare, Share2Icon } from 'lucide-react';

export default function PostPage() {
  const { postId } = useParams();
  const post = posts.find((p) => p.id === postId);
  const community = communities.find((c) => c.id === post?.communityId);
  const postComments = comments.filter((c) => c.postId === postId && !c.parentCommentId);
  const getReplies = (commentId) => comments.filter((c) => c.parentCommentId === commentId);

  if (!post) {
    return (
      <>
        <p className="text-gray-900">Post not found.</p>
      </>
    );
  }
  return (
    <>
      <article className="bg-white border border-gray-200 rounded-lg mb-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 px-4 pt-3">
          <Link to={`/r/${community?.name}`} className="font-bold text-gray-900 hover:underline">
            r/{community?.name}
          </Link>
          <span>·</span>
          <span>Posted by u/{post.author}</span>
          <span>·</span>
          <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 pt-1 pb-3">
            <h1 className="text-xl font-semibold my-1 text-gray-900">{post.title}</h1>
            {post.body && <p className="text-sm text-gray-900 mb-3">{post.body}</p>}

          </div>
        </div>
     <div className='flex items-center px-4 pb-3 gap-2'>
           <VoteButtons votes={post.votes} />
          <Link
            to={`/post/${post.id}`}
            className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200"
          >
            <MessageCircle size={16} className=''/> {post.commentCount}
          </Link>
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
            <Award size={18} /> Award
          </button>
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
            <Share2Icon size={16} /> Share
          </button>
     </div>
      </article>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="mt-0 text-gray-900">Comments ({postComments.length})</h3>
        {postComments.map((comment) => (
          <div key={comment.id} className="mb-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <strong className="text-gray-900">josh/{comment.author}</strong>
              <span>·</span>
              <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
            </div>
            <p className="text-sm text-gray-900">{comment.body}</p>
            {getReplies(comment.id).map((reply) => (
              <div key={reply.id} className="ml-6 border-l-2 border-gray-200 pl-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <strong className="text-gray-900">u/{reply.author}</strong>
                  <span>·</span>
                  <span>{formatDistanceToNow(new Date(reply.createdAt))} ago</span>
                </div>
                <p className="text-sm text-gray-900">{reply.body}</p>
              </div>
            ))}
          </div>
          
        ))}
         <div className='flex items-center px-4 pb-3 gap-2'>
           <VoteButtons votes={post.votes} />
          <Link
            to={`/post/${post.id}`}
            className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200"
          >
            <MessageCircle size={16} className=''/> {post.commentCount -1000}
          </Link>
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
            <Award size={18} /> Award
          </button>
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-200">
            <Share2Icon size={16} /> Share
          </button>
     </div>
      </div>
    </>
  );
}
