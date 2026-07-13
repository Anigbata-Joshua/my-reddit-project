import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, subDays } from 'date-fns';
import { usePostStore } from '../../../store/postStore';

export default function RecentPostsSidebar() {
    const { posts, loading, fetchPosts } = usePostStore();

    useEffect(() => {
        if (!posts?.length) fetchPosts();
    }, [posts?.length, fetchPosts]);

    const threeDaysAgo = subDays(new Date(), 3);
    const recentPosts = [...(posts || [])]
        .filter((post) => new Date(post.createdAt) >= threeDaysAgo)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    return (
        <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Posts</h2>
                <p className="text-sm text-gray-500 mt-1">Latest posts from the last 3 days.</p>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500">Loading recent posts...</p>
            ) : recentPosts.length ? (
                <div className="space-y-3">
                    {recentPosts.map((post) => (
                        <Link
                            key={post.postId}
                            to={`/post/${post.postId}`}
                            className="block rounded-xl border border-gray-200 p-3 transition hover:border-gray-300 hover:bg-gray-50"
                        >
                            <div className="flex items-start gap-3">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-semibold text-gray-900 truncate">{post.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatDistanceToNow(new Date(post.createdAt))} ago
                                    </p>
                                </div>
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                                    />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">No recent posts yet.</p>
            )}
        </div>
    );
}
