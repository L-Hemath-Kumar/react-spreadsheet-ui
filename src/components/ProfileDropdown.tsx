import React from 'react';
import { User, Settings, HelpCircle, LogOut, Bell, Shield } from 'lucide-react';

interface ProfileDropdownProps {
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      action: () => console.log('Profile menu clicked')
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => console.log('Settings menu clicked')
    },
    {
      icon: Bell,
      label: 'Notifications',
      action: () => console.log('Notifications settings clicked')
    },
    {
      icon: Shield,
      label: 'Privacy',
      action: () => console.log('Privacy settings clicked')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      action: () => console.log('Help menu clicked')
    }
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    item.action();
    onClose();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {/* User Info Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900">John Doe</div>
            <div className="text-sm text-gray-500">john.doe@company.com</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuClick(item)}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <item.icon className="w-4 h-4 text-gray-500" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-gray-200 py-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;