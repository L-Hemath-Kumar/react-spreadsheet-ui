import React from 'react';
import { Bell, X, CheckCircle, AlertCircle } from 'lucide-react';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Task Completed',
      message: 'Your spreadsheet has been successfully updated',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Review Required',
      message: 'New job request needs your attention',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New features are now available',
      time: '3 hours ago',
      unread: false
    }
  ];

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    console.log(`Notification clicked: ${notification.title}`);
  };

  const handleMarkAllRead = () => {
    console.log('Mark all notifications as read');
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Notifications</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-64 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
              notification.unread ? 'bg-blue-50' : ''
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {notification.type === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {notification.type === 'warning' && (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
                {notification.type === 'info' && (
                  <Bell className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notification.title}
                  </p>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleMarkAllRead}
          className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;