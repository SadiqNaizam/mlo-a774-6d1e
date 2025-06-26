import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ChatListItemProps {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isActive?: boolean;
}

const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  if (nameParts.length > 1 && nameParts[0] && nameParts[1]) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  name,
  avatarUrl,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isActive = false,
}) => {
  console.log(`ChatListItem loaded for: ${name}`);

  const baseClasses = "flex items-center p-3 space-x-4 w-full transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700";
  const activeClasses = isActive ? "bg-gray-100 dark:bg-gray-800" : "bg-transparent";

  return (
    <Link
      to="/conversation"
      state={{ contactId: id, contactName: name, avatarUrl }}
      className={`${baseClasses} ${activeClasses}`}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold text-gray-900 dark:text-white truncate">{name}</p>
          <time className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{timestamp}</time>
        </div>
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate pr-2">
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <Badge className="h-5 min-w-[1.25rem] flex items-center justify-center p-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;