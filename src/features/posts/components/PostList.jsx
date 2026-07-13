import PostCard from './PostCard';

export default function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </div>
  );
}
