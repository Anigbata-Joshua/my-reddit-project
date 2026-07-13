import { Sparkles } from 'lucide-react';
import ImageUpload from './ImageUpload';
import PostToolBar from './PostToolBar';

export default function CreatePostForm({
    title,
    body,
    error,
    imagePreview,
    fileInputRef,
    onTitleChange,
    onBodyChange,
    onPublish,
    onImageSelect,
    onImageRemove,
}) {
    return (
        <form onSubmit={onPublish} className="space-y-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Title*"
                    maxLength={300}
                    value={title}
                    onChange={(event) => onTitleChange(event.target.value)}
                    className="w-full border-none p-0 text-xl font-medium tracking-tight text-black placeholder-gray-400 focus:outline-none focus:ring-0"
                    required
                />
            </div>

            <div>
                <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                >
                    <Sparkles size={12} className="text-gray-400" />
                    Add tags
                </button>
            </div>

            <div className="space-y-2">
                <textarea
                    placeholder="Body text (optional)"
                    rows={8}
                    value={body}
                    onChange={(event) => onBodyChange(event.target.value)}
                    className="w-full resize-none border-none p-0 text-sm leading-relaxed text-black placeholder-gray-400 focus:outline-none focus:ring-0"
                />

                <PostToolBar onAddImage={() => fileInputRef.current?.click()} />
                <ImageUpload
                    imagePreview={imagePreview}
                    onImageSelect={onImageSelect}
                    onRemove={onImageRemove}
                    inputRef={fileInputRef}
                />
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                    type="button"
                    className="cursor-not-allowed rounded-full bg-gray-50 px-4 py-2 text-xs font-bold text-gray-400 transition-colors"
                    disabled
                >
                    Save Draft
                </button>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={!title.trim()}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                        title.trim()
                            ? 'cursor-pointer bg-black text-white shadow-sm hover:bg-gray-800'
                            : 'cursor-not-allowed bg-gray-50 text-gray-300'
                    }`}
                >
                    Post
                </button>
            </div>
        </form>
    );
}