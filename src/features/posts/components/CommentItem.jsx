import { formatDistanceToNow } from 'date-fns';
import VoteButtons from '../../../shared/VoteButtons';

export default function CommentItem({ comment, user, onDelete }) {
    return (
        <div className="border-b border-gray-100 pb-3 last:border-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">u/{comment?.author || 'anonymous'}</span>
                <span>·</span>
                <span>{comment?.createdAt ? formatDistanceToNow(new Date(comment.createdAt)) : 'just now'} ago</span>
            </div>
            <p className="text-sm text-gray-900 whitespace-pre-line">{comment?.body}</p>
            <div className="flex items-center gap-2 mt-2">
                <VoteButtons
                    votes={comment?.voteCount ?? 0}
                    targetId={comment?.commentId}
                    targetType="comment"
                />
                {user?.username === comment?.author && (
                    <button
                        onClick={() => onDelete(comment.commentId)}
                        className="text-[11px] text-red-500 hover:text-red-700 font-semibold"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}