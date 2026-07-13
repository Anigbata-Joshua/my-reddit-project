import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileDropdownItem({ to = '#', onClick, children, icon, variant = 'default' }) {
  const base = 'w-full flex items-center gap-3 px-3 py-2 text-sm text-black rounded-md hover:bg-gray-100 transition-colors text-left';
  const classes = variant === 'stacked' ? `${base} items-start` : base;

  if (to === '#') {
    return (
      <button type="button" onClick={onClick} className={`${classes} cursor-pointer`}>
        {icon}
        <span className="flex-1">{children}</span>
      </button>
    );
  }

  return (
    <Link to={to} onClick={onClick} className={classes}>
      {icon}
      <span className="flex-1">{children}</span>
    </Link>
  );
}
