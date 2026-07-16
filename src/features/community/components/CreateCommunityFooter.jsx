import React from 'react';

export default function CreateCommunityFooter({
    onClose,
    onCreate,
    isFormValid
}) {
    return (
        <div className="border-t border-gray-100 bg-white px-8 py-4 flex items-center justify-between mt-4">

            {/* Pagination/Step Indicator Dots */}
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Action Trigger Buttons */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onClose}
                    type="button"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 text-xs font-bold rounded-full transition-all"
                >
                    Back
                </button>
                <button
                    onClick={onCreate}
                    disabled={!isFormValid}
                    type="button"
                    className={`px-5 py-2 text-xs font-bold rounded-full transition-all active:scale-95 ${isFormValid
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Create Community
                </button>
            </div>

        </div>
    );
}