import { Link, useNavigate } from 'react-router-dom';
import { Bell, SquarePlus, MessageCircleMore } from 'lucide-react';
import { useState } from 'react';
import ProfileDropdown from '../features/profiledropdown/components/ProfileDropdown';
import NavbarActionButton from '../features/navbar/components/NavbarActionButton';
import NavbarBrand from '../features/navbar/components/NavbarBrand';
import NavbarSearchbar from '../features/navbar/components/NavbarSearchbar';

export default function Navbar() {

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key !== 'Enter' || !searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 flex flex-col md:h-14 justify-center px-4 py-2 md:py-0 gap-2 md:gap-4">
      <div className="flex items-center justify-between w-full">
        <NavbarBrand />

        <NavbarSearchbar
          searchQuery={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="hidden md:flex flex-1 max-w-xl mx-4"
        />

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <NavbarActionButton label="Open Chat">
            <MessageCircleMore size={20} />
          </NavbarActionButton>

          <NavbarActionButton to="/createpost" label="Create Post" buttonClassName="rounded-full p-2 md:px-4 md:py-2 font-bold text-sm bg-white">
            <SquarePlus size={16} />
            <span className="hidden md:inline ml-1">Create</span>
          </NavbarActionButton>

          <NavbarActionButton label="Notifications">
            <Bell size={20} />
          </NavbarActionButton>

          <div className="ml-1 cursor-pointer">
            <ProfileDropdown />
          </div>
        </div>
      </div>

      <NavbarSearchbar
        searchQuery={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        className="flex md:hidden w-full"
      />

    </header>
  );
}