import React from 'react';
import { User } from 'lucide-react';

export default function Avatar({ src, alt = 'avatar', className = '' }) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <div className={`flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-500 ${className}`}>
      <User size={18} />
    </div>
  );
}
