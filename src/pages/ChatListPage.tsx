import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import ChatListItem from '@/components/ChatListItem';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

// Mock data representing chat conversations
const mockChats = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice',
    lastMessage: 'Hey, are we still on for lunch tomorrow? Let me know!',
    timestamp: '10:45 AM',
    unreadCount: 2,
    isActive: false,
  },
  {
    id: '2',
    name: 'Bob Williams',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob',
    lastMessage: 'Sure, sounds good! I will be there.',
    timestamp: '10:42 AM',
    unreadCount: 0,
    isActive: true, // Example of an active chat
  },
  {
    id: '3',
    name: 'Charlie Brown',
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie',
    lastMessage: 'Can you please send me the report file?',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isActive: false,
  },
  {
    id: '4',
    name: 'Diana Prince',
    avatarUrl: 'https://i.pravatar.cc/150?u=diana',
    lastMessage: "I've got a new idea for the project we discussed.",
    timestamp: 'Yesterday',
    unreadCount: 5,
    isActive: false,
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    avatarUrl: 'https://i.pravatar.cc/150?u=ethan',
    lastMessage: 'Mission accomplished. The package is secure.',
    timestamp: '2 days ago',
    unreadCount: 0,
    isActive: false,
  },
  {
    id: '6',
    name: 'Fiona Gallagher',
    avatarUrl: 'https://i.pravatar.cc/150?u=fiona',
    lastMessage: 'See you tonight!',
    timestamp: '3 days ago',
    unreadCount: 0,
    isActive: false,
  }
];

const ChatListPage: React.FC = () => {
  console.log('ChatListPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <AppHeader />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-4 py-4 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search chats..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="container mx-auto px-0 md:px-4">
            {filteredChats.length > 0 ? (
              filteredChats.map(chat => (
                <ChatListItem
                  key={chat.id}
                  id={chat.id}
                  name={chat.name}
                  avatarUrl={chat.avatarUrl}
                  lastMessage={chat.lastMessage}
                  timestamp={chat.timestamp}
                  unreadCount={chat.unreadCount}
                  isActive={chat.isActive}
                />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No chats found.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>

      <AppFooter />
    </div>
  );
};

export default ChatListPage;