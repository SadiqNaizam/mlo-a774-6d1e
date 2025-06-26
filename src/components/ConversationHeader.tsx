import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface ConversationHeaderProps {
  contactName: string;
  contactAvatarUrl?: string;
  contactStatus: string;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  contactName = 'Jane Doe',
  contactAvatarUrl,
  contactStatus = 'offline',
}) => {
  console.log('ConversationHeader loaded for:', contactName);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const isOnline = contactStatus.toLowerCase() === 'online';

  return (
    <header className="flex items-center p-3 border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button variant="ghost" size="icon" className="mr-2" asChild>
        <Link to="/chat-list" aria-label="Back to chat list">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </Button>
      
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={contactAvatarUrl} alt={contactName} />
          <AvatarFallback>{getInitials(contactName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{contactName}</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            {isOnline && (
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            )}
            <p>{contactStatus}</p>
          </div>
        </div>
      </div>
      
      {/* Placeholder for future action icons like video call or more options */}
      <div className="ml-auto">
        {/* <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button> */}
      </div>
    </header>
  );
};

export default ConversationHeader;