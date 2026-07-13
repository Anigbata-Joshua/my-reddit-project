import { useState } from "react";


export default function CommentForm({ onSubmit }) {
    const [commentBody, setCommentBody] = useState('');


  const handleSubmit = async () => {
    if (!commentBody.trim()) return;
    await onSubmit(commentBody);
    setCommentBody('');
};
    return (

        <>
            {/* Comment Form */}
            <div className="mb-4">
                <textarea
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-blue-400 resize-none"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!commentBody.trim()}
                    className={`mt-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${commentBody.trim()
                        ? 'bg-red-700 text-white hover:bg-red-800 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Comment
                </button>
            </div>
        </>
    )
}