// components/FormInput.jsx
import React from 'react';

export default function FormInput({
  label,
  maxLength,
  value,
  onChange,
  placeholder,
  isTextArea = false,
  rows = 5,
}) {
  const InputElement = isTextArea ? 'textarea' : 'input';

  return (
    <div>
      <div className="relative bg-gray-100 border border-transparent rounded-xl px-3 pt-4 pb-2 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
        <label className="absolute top-1 left-3 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
          {label} <span className="text-red-500">*</span>
        </label>
        <InputElement
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={isTextArea ? rows : undefined}
          className={`w-full bg-transparent text-sm text-gray-900 outline-none mt-1 ${isTextArea ? 'resize-none font-normal leading-relaxed' : 'font-medium'
            }`}
        />
      </div>
      <div className="flex justify-end text-[10px] text-gray-400 font-semibold mt-1 px-1">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}