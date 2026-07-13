import React from 'react';

export default function Input({ label, name, value, onChange, type = 'text', required = false }) {
    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                className="peer w-full rounded-2xl bg-gray-100 p-4 text-sm text-gray-900 outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-blue-200"
            />
            <label
                className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none transition-all duration-150 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 ${value ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        </div>
    );
}