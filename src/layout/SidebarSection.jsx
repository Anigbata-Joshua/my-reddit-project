import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { getLinkClass, SUBHEADER_CLASS } from '../utils/sidebarStyles';


export default function SidebarSection({ title, items, onItemClick }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-4 flex flex-col">
            <button onClick={() => setIsOpen(!isOpen)} className={SUBHEADER_CLASS}>
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
                            className={getLinkClass(location.pathname === to)}
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