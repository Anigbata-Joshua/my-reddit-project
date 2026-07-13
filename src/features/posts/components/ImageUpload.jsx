import { useRef } from 'react';

export default function ImageUpload({ imagePreview, onImageSelect, onRemove, inputRef }) {
    const internalInputRef = useRef(null);
    const resolvedInputRef = inputRef || internalInputRef;

    return (
        <>
            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                ref={resolvedInputRef}
                onChange={onImageSelect}
                className="hidden"
            />
            {imagePreview && (
                <div className="relative mt-2 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                    <img src={imagePreview} alt="preview" className="w-full max-h-64 object-cover" />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute right-2 top-2 rounded-full bg-black/55 px-2 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-black/70"
                    >
                        ✕
                    </button>
                </div>
            )}
        </>
    );
}