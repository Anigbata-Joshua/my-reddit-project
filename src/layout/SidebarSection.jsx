import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function SidebarSection({ title, items, onItemClick }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const linkClass = (active) =>
        `flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium hover:bg-black/5 transition-colors w-full text-left ${active ? 'bg-black/5 font-bold text-black' : 'text-gray-700'}`;

    const subheaderClass = "flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase px-3 py-2 border-t border-gray-200 pt-4 mt-2 cursor-pointer select-none group hover:text-black transition-colors";

    return (
        <div className="mb-4 flex flex-col">
            <button onClick={() => setIsOpen(!isOpen)} className={subheaderClass}>
                <span>{title}</span>
                <ChevronDown size={14} className={`transform transition-transform duration-200 ${isOpen ? '' : '-rotate-180'}`} />
            </button>
            <div className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-0.5' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                <div className="overflow-hidden flex flex-col gap-0.5">
                    {items.map(({ to, label, icon }) => (
                        <Link
                            key={label}
                            to={to}
                            onClick={onItemClick}
                            className={linkClass(location.pathname === to)}
                        >
                            {icon}
                            <span className="truncate">{label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}