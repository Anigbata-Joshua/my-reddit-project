import CommentItem from './CommentItem';

export default function CommentList({ comments, user, onDelete }) {
    return (
        <div className="space-y-4">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.commentId}
                        comment={comment}
                        user={user}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <p className="text-xs text-gray-400 py-4">No comments yet. Be the first to share your thoughts!</p>
            )}
        </div>
    );
}