// components/CreateCommunityModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCommunityStore } from '../../../store/communityStore';
import { formatCommunityName } from '../../../utils/communityUtils';
import FormInput from '../components/FormInput';
import CommunityPreview from '../components/CommunityPreview';
import CreateCommunityFooter from '../components/CreateCommunityFooter';

export default function CreateCommunityModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { createCommunity } = useCommunityStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const isFormValid = name.trim() && description.trim();

  const handleCreate = async () => {
    if (!isFormValid) return;
    const result = await createCommunity(name, description);
    if (result.success) {
      onClose();
      navigate(`/r/${name}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay wrapper above, safe to comment here */}

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <FormInput
                label="Community name"
                maxLength={21}
                value={name}
                onChange={(e) => setName(formatCommunityName(e.target.value))}
                placeholder="r/"
              />

              <FormInput
                label="Description"
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about topics shared inside your community"
                isTextArea
              />
            </div>

            <CommunityPreview name={name} description={description} />
          </div>
        </div>

        {/* Modular Footer */}
        <CreateCommunityFooter
          onClose={onClose}
          onCreate={handleCreate}
          isFormValid={isFormValid}
        />

      </div>
    </div>
  );
}