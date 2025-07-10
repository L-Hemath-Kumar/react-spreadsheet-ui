import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search:', e.target.value);
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
    setShowNotifications(!showNotifications);
    setShowProfile(false); // Close other dropdown
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    setShowProfile(!showProfile);
    setShowNotifications(false); // Close other dropdown
  };

  const handleBreadcrumbClick = (item: string) => {
    console.log(`Breadcrumb clicked: ${item}`);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span 
            className="hover:text-gray-900 cursor-pointer transition-colors"
            onClick={() => handleBreadcrumbClick('Workspace')}
          >
            Workspace
          </span>
          <span>{'>'}</span>
          <span 
            className="hover:text-gray-900 cursor-pointer transition-colors"
            onClick={() => handleBreadcrumbClick('Folder 2')}
          >
            Folder 2
          </span>
          <span>{'>'}</span>
          <span className="font-medium text-gray-900">Spreadsheet 3</span>
        </div>

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search within sheet"
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all"
            />
          </div>
          
          {/* Notification Bell with Dropdown */}
          <div className="relative" ref={notificationRef}>
            <div 
              className="relative cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-colors"
              onClick={handleNotificationClick}
            >
              <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </div>
            
            {showNotifications && (
              <NotificationDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* User Profile with Dropdown */}
          <div className="relative" ref={profileRef}>
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 py-1 transition-colors"
              onClick={handleProfileClick}
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">John Doe</div>
                <div className="text-gray-500 text-xs">john.doe...</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {showProfile && (
              <ProfileDropdown onClose={() => setShowProfile(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;