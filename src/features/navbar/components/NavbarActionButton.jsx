import { Link } from 'react-router-dom';

export default function NavbarActionButton({ to, label, children, className = '', buttonClassName = '' }) {
    const Tag = to ? Link : 'button';

    return (
        <div className={`group relative inline-block ${className}`}>
            <Tag
                {...(to ? { to } : { type: 'button' })}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-gray-900 cursor-pointer hover:bg-gray-200 ${buttonClassName}`}
            >
                {children}
            </Tag>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-gray-900 text-white text-[10px] rounded px-2.5 py-1 whitespace-nowrap shadow-md opacity-0 translate-y-1 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out">
                {label}
            </div>
        </div>
    );
}
