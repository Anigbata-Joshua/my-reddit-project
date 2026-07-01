import { Link } from 'react-router-dom';
import { Sparkles, Plus, Bell, SquarePlus, MessageCircleMore } from 'lucide-react';
import logo from "../../assets/images.jpg"

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-10 flex flex-col md:h-14 justify-center px-4 py-2 md:py-0 gap-2 md:gap-4">

      <div className="flex items-center justify-between w-full">

        {/* Left Section: Logo (Add structural padding-left on mobile so it doesn't clash with your absolute Menu toggle button) */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 shrink-0 pl-10 md:pl-0">
          <span className="font-extrabold text-2xl tracking-tight text-orange-600">reddit</span>
        </Link>

        {/* Desktop-Only Search: This instance only appears on medium screens and up */}
        <div className="hidden md:flex flex-1 max-w-xl items-center bg-gray-100 rounded-full px-3.5 py-2 gap-2 text-gray-500 mx-4">
          <img src={logo} className='w-6 h-auto cursor-pointer' alt="Brand logo" />
          <input
            type="text"
            placeholder="Search Reddit"
            className="border-none bg-transparent outline-none flex-1 text-sm min-w-0 text-center"
          />
          <Sparkles size={16} className="shrink-0 text-orange-600 cursor-pointer" />
        </div>

        {/* Right Section: Action Utilities (Visible on all viewports) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ">
          <button className="hidden w-9 h-9 rounded-full md:flex items-center justify-center text-gray-900 cursor-pointer hover:bg-gray-200" aria-label="Chat">
            <MessageCircleMore size={20} />
          </button>

          <button className="rounded-full p-2 md:px-4 md:py-2 font-bold text-sm  bg-white cursor-pointer hover:bg-gray-200 flex items-center justify-center">
            <SquarePlus size={16} />
            <span className="hidden md:inline ml-1">Create</span>
          </button>

          <button className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-gray-900 hover:bg-gray-200" aria-label="Notifications">
            <Bell size={20} />
          </button>

          <Link
            to="/login"
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ml-1"
          >
            JD
          </Link>
        </div>
      </div>

      {/* SECOND ROW: Mobile-Only Search (Hides completely on desktop screens) */}
      <div className="flex md:hidden w-full items-center bg-gray-100 rounded-full px-3.5 py-2 gap-2 text-gray-500">
        <img src={logo} className='w-6 h-auto' alt="Brand logo" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="border-none bg-transparent outline-none flex-1 text-sm min-w-0 text-center space-y-1"
        />
      </div>

    </header>
  );
}