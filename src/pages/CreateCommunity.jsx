import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCommunityStore } from '../store/communityStore';
import { useNavigate } from 'react-router-dom';

export default function CreateCommunityModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { createCommunity } = useCommunityStore();
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!name.trim() || !description.trim()) return;
    const result = await createCommunity(name, description);
    if (result.success) {
      onClose();
      navigate(`/r/${name}`);
    }
  };

  return (
    // Backdrop overlay matching the darkened desktop view
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">

      {/* Modal Container */}
      <div className="bg-white w-full max-w-[680px] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col font-sans text-black">

        {/* Header Close Button Row */}
        <div className="flex justify-end pt-4 px-4">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-8 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Tell us about your community</h1>
          <p className="text-xs text-gray-500 mb-6 font-medium">
            A name and description help people understand what your community is all about.
          </p>

          {/* Form and Card Layout Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

            {/* Left Side: Input Form Fields */}
            <div className="space-y-4">

              {/* Community Name Field Wrapper */}
              <div>
                <div className="relative bg-gray-100 border border-transparent rounded-xl px-3 pt-4 pb-2 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="absolute top-1 left-3 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                    Community name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={21}
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/\s+/g, ''))} // No spaces in r/ names
                    placeholder="r/"
                    className="w-full bg-transparent text-sm text-gray-900 outline-none mt-1 font-medium"
                  />
                </div>
                <div className="flex justify-end text-[10px] text-gray-400 font-semibold mt-1 px-1">
                  {name.length}/21
                </div>
              </div>

              {/* Description Field Wrapper */}
              <div>
                <div className="relative bg-gray-100 border border-transparent rounded-xl px-3 pt-4 pb-2 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <label className="absolute top-1 left-3 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full bg-transparent text-sm text-gray-900 outline-none mt-1 resize-none font-normal leading-relaxed"
                    placeholder="Provide details about topics shared inside your community"
                  />
                </div>
                <div className="flex justify-end text-[10px] text-gray-400 font-semibold mt-1 px-1">
                  {description.length}/500
                </div>
              </div>

            </div>

            {/* Right Side: Real-time Live Preview Card Container Layout */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center min-h-[220px]">

              <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  {/* Default Native Reddit Logo Badge */}
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shrink-0 border border-orange-700 shadow-sm">
                    <span className="text-white font-extrabold text-base italic leading-none select-none">r/</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                      r/{name.trim() || 'communityname'}
                    </h4>
                    <p className="text-[10px] font-bold text-gray-500 tracking-wide">
                      1 weekly visitor • 1 weekly contributor
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-medium break-words leading-relaxed">
                  {description.trim() || 'Your community description'}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Footer Navigation Bar */}
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
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 text-xs font-bold rounded-full transition-all"
            >
              Back
            </button>
            <button
              onClick={handleCreate}
              disabled={!name.trim() || !description.trim()}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all active:scale-95 ${name.trim() && description.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              Create Community
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
