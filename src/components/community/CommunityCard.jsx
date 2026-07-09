import { formatDistanceToNow } from 'date-fns';

export default function RecentPostsWidget({ posts }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-bold text-gray-500">RECENT POSTS</div>
        <span className="text-xs font-bold text-blue-600 cursor-pointer">Clear</span>
      </div>
      {posts.map((post, i) => (
        <div key={post.postId} className={`flex gap-2 py-2 ${i > 0 ? 'border-t border-gray-200' : ''}`}>
          <div className="flex-1">
            <div className="text-[11px] text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </div>
            <div className="text-sm font-semibold my-0.5 text-gray-900">{post.title}</div>
            <div className="text-[11px] text-gray-500">
              {post.votes} upvotes · {post.commentCount} comments
            </div>
          </div>
          <div className="w-14 h-14 rounded-md bg-gray-100 shrink-0" />
        </div>
      ))}
    </div>
  );
}
