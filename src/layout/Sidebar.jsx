import { Link, useLocation, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useCommunityStore } from '../store/communityStore';
import { sidebarLinks, resources, resources2, resources3 } from '../layout/links';
import { useEffect, useState } from 'react';
import CreateCommunityModal from '../features/community/pages/CreateCommunityPage';
import SidebarSection from './SidebarSection';
import SidebarPrimaryNav from './SiderbarPrimaryNav';

import { getLinkClass } from '../utils/sidebarStyles';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className='md:hidden fixed top-3 left-4 z-50 rounded-lg p-1 bg-white border border-gray-200 shadow-sm' aria-label='Toggle navigation sidebar'>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && <div onClick={() => setIsOpen(false)} className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" />}
      <aside className={`w-60 shrink-0 p-2 border-r border-gray-200 bg-white md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0 md:z-0 md:block fixed top-0 left-0 h-full z-45 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} overflow-y-auto`}>
        <nav className="mb-4 pt-14 md:pt-0 flex flex-col gap-0.5 ">
          {sidebarLinks.map((link) => link.isModalTrigger ? (
            <button
              key={link.label}
              onClick={() => { setIsOpen(false); setIsCommunityModalOpen(true); }}
              className={getLinkClass(false)}
            >
              {link.icon} {link.label}
            </button>
          ) : (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => getLinkClass(isActive)}
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </nav>
        <SidebarPrimaryNav />

        <SidebarSection title="Resources" items={resources} onItemClick={() => setIsOpen(false)} />
        <SidebarSection title="Explore" items={resources2} onItemClick={() => setIsOpen(false)} />
        <SidebarSection title="Terms & Policies" items={resources3} onItemClick={() => setIsOpen(false)} />

        <footer className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-100">
          <span className="text-[10px] text-gray-500 tracking-wide block">Reddit, Inc. © 2026. All rights reserved.</span>
        </footer>
      </aside>

      <CreateCommunityModal isOpen={isCommunityModalOpen} onClose={() => setIsCommunityModalOpen(false)} onCreate={() => setIsCommunityModalOpen(false)} />
    </>
  );
}