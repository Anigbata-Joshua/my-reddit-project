import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ rightColumn }) {
  return (
    // h-screen + overflow-hidden freezes the viewport so the whole page never scrolls
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto shrink-0 border-r border-gray-200 bg-white">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-6 max-w-7xl mx-auto w-full">
            <div className="flex-1 min-w-0 bg-white rounded-xl shadow-sm p-6">
              <Outlet />
            </div>
            {rightColumn && (
              <div className="w-80 shrink-0 hidden xl:block sticky top-0 h-fit bg-white rounded-xl shadow-sm p-6">
                {rightColumn}
              </div>
            )}
            
          </div>
        </main>

      </div>
    </div>
  );
}