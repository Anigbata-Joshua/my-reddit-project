import { Link, useLocation, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useCommunityStore } from '../store/communityStore';
import { sidebarLinks, resources, resources2, resources3 } from '../layout/links';
import { useEffect, useState } from 'react';
import CreateCommunityModal from '../features/community/pages/CreateCommunityPage';
import SidebarSection from './SidebarSection';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);

  // Toggle states for collapsible sections
  const [showCommunities, setShowCommunities] = useState(true);


  const { communities, fetchCommunities } = useCommunityStore();

  useEffect(() => {
    fetchCommunities();
  }, []);

  // Checks active status 
  const linkClass = (active) =>
    `flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium hover:bg-black/5 transition-colors w-full text-left ${active ? 'bg-black/5 font-bold text-black' : 'text-gray-700'
    }`;

  // Shared subheader styling with chevron rotation animation
  const subheaderClass = "flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase px-3 py-2 border-t border-gray-200 pt-4 mt-2 cursor-pointer select-none group hover:text-black transition-colors";

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden fixed top-3 left-4 z-50 rounded-lg p-1 bg-white border border-gray-200 shadow-sm'
        aria-label='Toggle navigation sidebar'
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
    w-60 shrink-0 p-2 border-r border-gray-200 bg-white
    md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0 md:z-0 md:block
    fixed top-0 left-0 h-full z-45 transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    overflow-y-auto`}>

        {/* Primary Navigation */}
        <nav className="mb-4 pt-14 md:pt-0 flex flex-col gap-0.5">
          {sidebarLinks.map((link) => {
            // Check if link item is our custom modal configuration object
            if (link.isModalTrigger) {
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setIsOpen(false);
                    setIsCommunityModalOpen(true);
                  }}
                  className={linkClass(false)}
                >
                  {link.icon} {link.label}
                </button>
              );
            }

            // Fallback rendering standard navigation paths
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => linkClass(isActive)}
              >
                {link.icon} {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Communities Section */}
        <div className="mb-4 flex flex-col">
          <button
            onClick={() => setShowCommunities(!showCommunities)}
            className={subheaderClass}
          >
            <span>Communities</span>
            <ChevronDown size={14} className={`transform transition-transform duration-200 ${showCommunities ? '' : '-rotate-180'}`} />
          </button>

          <div className={`grid transition-all duration-200 ease-in-out ${showCommunities ? 'grid-rows-[1fr] opacity-100 mt-0.5' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
            <div className="overflow-hidden flex flex-col gap-0.5">
              {communities.map((c) => {
                const communityPath = `/r/${c.name}`;
                return (
                  <Link
                    key={c.communityId}
                    to={communityPath}
                    onClick={() => setIsOpen(false)}
                    className={linkClass(location.pathname === communityPath)}
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {c.name[0].toUpperCase()}
                    </span>
                    <span className="truncate">{c.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <SidebarSection title="Resources" items={resources} onItemClick={() => setIsOpen(false)} />

        {/* Explore Section */}
        <SidebarSection title="Explore" items={resources2} onItemClick={() => setIsOpen(false)} />

        {/* Terms & Policies */}
        <SidebarSection title="Terms & Policies" items={resources3} onItemClick={() => setIsOpen(false)} />
        <footer className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-100">
          <span className="text-[10px] text-gray-500 tracking-wide block">
            Reddit, Inc. © 2026. All rights reserved.
          </span>
        </footer>
      </aside>

      {/* Renders modal inline wrapper without splitting document tree layout hierarchies */}
      <CreateCommunityModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        onCreate={() => setIsCommunityModalOpen(false)}
      />
    </>
  );
}