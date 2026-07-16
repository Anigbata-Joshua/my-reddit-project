import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {useCommunityStore} from '../store/communityStore'


export default function SidebarPrimaryNav() {
    const [showCommunities, setShowCommunities] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
      const { communities, fetchCommunities } = useCommunityStore();


    const linkClass = (active) => `flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium hover:bg-black/5 transition-colors w-full text-left
   ${active ? 'bg-black/5 font-bold text-black' : 'text-gray-700'}`;
    const subheaderClass = "flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase px-3 py-2 border-t border-gray-200 pt-4 mt-2 cursor-pointer select-none group hover:text-black transition-colors";

    return (
        <>
            <div className="mb-4 flex flex-col">
                <button onClick={() => setShowCommunities(!showCommunities)} className={subheaderClass}>
                    <span>Communities</span>
                    <ChevronDown size={14} className={`transform transition-transform duration-200 ${showCommunities ? '' : '-rotate-180'}`} />
                </button>

                <div className={`grid transition-all duration-200 ease-in-out ${showCommunities ? 'grid-rows-[1fr] opacity-100 mt-0.5' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                    <div className="overflow-hidden flex flex-col gap-0.5">
                        {communities.map((c) => {
                            const path = `/r/${c.name}`;
                            return (
                                <Link key={c.communityId} to={path} onClick={() => setIsOpen(false)} className={linkClass(location.pathname === path)}>
                                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{c.name[0].toUpperCase()}</span>
                                    <span className="truncate">{c.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}