import { Link } from 'react-router-dom';
import { Sparkles, Bell, SquarePlus, MessageCircleMore } from 'lucide-react';
import logo from "../../assets/images.jpg";
import UserProfileDropdown from '../modals/UserProfileDropdown';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 flex flex-col md:h-14 justify-center px-4 py-2 md:py-0 gap-2 md:gap-4">

      <div className="flex items-center justify-between w-full">

        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 shrink-0 pl-10 md:pl-0">
          <span className="font-extrabold text-2xl tracking-tight text-orange-600">reddit</span>
        </Link>

        {/* Desktop-Only Search */}
        <div className="hidden md:flex flex-1 max-w-xl items-center bg-gray-100 rounded-full px-3.5 py-2 gap-2 text-gray-500 mx-4">
          <img src={logo} className='w-6 h-auto cursor-pointer' alt="Brand logo" />
          <input
            type="text"
            placeholder="Search Reddit"
            className="border-none bg-transparent outline-none flex-1 text-sm min-w-0 text-center"
          />
          <Sparkles size={16} className="shrink-0 text-orange-600 cursor-pointer" />
        </div>

        {/* Right Section: Action Utilities */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Chat Utility Container */}
          <div className="group relative hidden md:inline-block">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-900 cursor-pointer hover:bg-gray-200" aria-label="Chat">
              <MessageCircleMore size={20} />
            </button>
            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-gray-900 text-white text-[10px] rounded px-2.5 py-1 whitespace-nowrap shadow-md
                            opacity-0 translate-y-1 scale-95 pointer-events-none
                            group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 
                            transition-all duration-200 ease-out">
              Open Chat
            </div>
          </div>

          {/* Create Utility Container */}
          <Link to="/createpost" className="group relative inline-block">
            <button className="rounded-full p-2 md:px-4 md:py-2 font-bold text-sm bg-white cursor-pointer hover:bg-gray-200 flex items-center justify-center">
              <SquarePlus size={16} />
              <span className="hidden md:inline ml-1">Create</span>
            </button>
            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-gray-900 text-white text-[10px] rounded px-2.5 py-1 whitespace-nowrap shadow-md
                            opacity-0 translate-y-1 scale-95 pointer-events-none
                            group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 
                            transition-all duration-200 ease-out">
              Create Post
            </div>
          </Link>

          {/* Notifications Utility Container */}
          <div className="group relative inline-block">
            <button className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-gray-900 hover:bg-gray-200" aria-label="Notifications">
              <Bell size={20} />
            </button>
            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-gray-900 text-white text-[10px] rounded px-2.5 py-1 whitespace-nowrap shadow-md
                            opacity-0 translate-y-1 scale-95 pointer-events-none
                            group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 
                            transition-all duration-200 ease-out">
              Notifications
            </div>
          </div>

          <div className='ml-1'>
            <UserProfileDropdown />
          </div>
        </div>
      </div>

      {/* SECOND ROW: Mobile-Only Search */}
      <div className="flex md:hidden w-full items-center bg-gray-100 rounded-full px-3.5 py-2 gap-2 text-gray-500">
        <img src={logo} className='w-6 h-auto' alt="Brand logo" />
        
       
      </div>

    </header>
  );
}