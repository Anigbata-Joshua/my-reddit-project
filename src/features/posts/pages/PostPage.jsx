import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePostStore } from '../../../store/postStore';
import { useCommentStore } from '../../../store/commentsStore';
import { useCommunityStore, getCommunityName } from '../../../store/communityStore';
import { useAuthStore } from '../../../store/authstore';
import PostDetail from '../components/PostDetail';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import PostPageSkeleton from '../components/PostPageSkeleton';

export default function PostPage() {
  const { postId } = useParams();
  const { posts, loading, fetchPosts } = usePostStore();
  const { communities, fetchCommunities } = useCommunityStore();
  const { comments, fetchComments, addComment, deleteComment } = useCommentStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (posts.length === 0) fetchPosts();
    if (communities.length === 0) fetchCommunities();
    fetchComments(postId);
  }, [postId]);

  const post = posts.find((p) => p.postId === postId);
  const communityName = post ? getCommunityName(communities, post.communityId) : '';

  if (loading && !post) return <PostPageSkeleton />;
  if (!post) return <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm font-medium text-gray-700">Post not found.</div>;

  const handleAddComment = async (body) => {
    await addComment(postId, body);
  };

  return (
    <>
      <PostDetail post={post} communityName={communityName} />
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Comments ({comments.length})</h3>
        <CommentForm onSubmit={handleAddComment} />
        <CommentList comments={comments} user={user} onDelete={deleteComment} />
      </div>
    </>
  );
}