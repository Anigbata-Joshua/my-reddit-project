import { Sparkles } from 'lucide-react';
import logo from '../../../assets/images.jpg';

export default function NavbarSearchbar({ searchQuery, onChange, onKeyDown, className = '' }) {
    return (
        <div className={`flex items-center bg-gray-100 rounded-full px-3.5 py-2 gap-2 text-gray-500 ${className}`}>
            <img src={logo} className="w-6 h-auto cursor-pointer" alt="Brand logo" />
            <input
                type="text"
                placeholder="Find anything"
                value={searchQuery}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="border-none bg-transparent outline-none flex-1 text-sm min-w-0 text-center"
            />
            <Sparkles size={16} className="shrink-0 text-orange-600 cursor-pointer " />
            <span className='text-xs'>Ask</span>
        </div>
    );
}
