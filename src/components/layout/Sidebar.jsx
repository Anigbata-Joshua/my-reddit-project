import { Link, useLocation, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { communities } from '../../data/mockData';
import { sidebarLinks, resources, resources2, resources3 } from '../../data/links';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Checks active status by matching the current URL path
  const linkClass = (active) =>
    `flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium hover:bg-black/5 transition-colors ${active ? 'bg-black/5 font-bold text-black' : 'text-gray-700'
    }`;

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
        overflow-y-auto
      `}>

        {/*Primary Navigation */}
        <nav className="mb-4 pt-14 md:pt-0 flex flex-col gap-0.5">
          {sidebarLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => linkClass(isActive)}
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        {/*Communities Section */}
        <div className="mb-4 flex flex-col gap-0.5">
          <div className="text-xs font-bold text-gray-500 uppercase px-3 py-2 border-t border-gray-200 pt-4 mt-2">
            Communities
          </div>
          {communities.map((c) => {
            const communityPath = `/r/${c.name}`;
            return (
              <Link
                key={c.id}
                to={communityPath}
                onClick={() => setIsOpen(false)}
                className={linkClass(location.pathname === communityPath)}
              >
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  {c.name[0].toUpperCase()}
                </span>
                <span className="truncate">r/{c.name}</span>
              </Link>
            );
          })}
        </div>

        {/* SECTION 3: Resources Section */}
        <div className="mb-4 flex flex-col gap-0.5">
          <div className="text-xs font-bold text-gray-500 uppercase px-3 py-2 border-t border-gray-200 pt-4 mt-2">
            Resources
          </div>
          {resources.map(({ to, label, icon }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setIsOpen(false)}
              className={linkClass(location.pathname === to)}
            >
              {icon}
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </div>

        {/* SECTION 4: Explore (Best of Reddit) */}
        <div className="mb-4 flex flex-col gap-0.5">
          <div className="text-xs font-bold text-gray-500 uppercase px-3 py-2 border-t border-gray-200 pt-4 mt-2">
            Explore
          </div>
          {resources2.map(({ to, label, icon }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setIsOpen(false)}
              className={linkClass(location.pathname === to)}
            >
              {icon}
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </div>

        {/* SECTION 5: Terms & Policies */}
        <div className="mb-4 flex flex-col gap-0.5">
          <div className="text-xs font-bold text-gray-500 uppercase px-3 py-2 border-t border-gray-200 pt-4 mt-2">
            Terms & Policies
          </div>
          {resources3.map(({ to, label, icon }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setIsOpen(false)}
              className={linkClass(location.pathname === to)}
            >
              {icon}
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </div>

      </aside>
    </>
  );
}