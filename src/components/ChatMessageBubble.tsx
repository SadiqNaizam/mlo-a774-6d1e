import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import clsx from 'clsx';

type MessageStatus = 'sent' | 'delivered' | 'read' | 'sending' | 'error';

interface ChatMessageBubbleProps {
  message: string;
  timestamp: string;
  isSentByCurrentUser: boolean;
  status?: MessageStatus;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  timestamp,
  isSentByCurrentUser,
  status,
}) => {
  console.log('ChatMessageBubble loaded');

  // Renders the appropriate status icon for sent messages
  const StatusIcon = () => {
    if (!isSentByCurrentUser || !status) return null;

    switch (status) {
      case 'sent':
        return <Check className="h-4 w-4" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4" />;
      case 'read':
        return <CheckCheck className="h-4 w-4 text-blue-400" />;
      // Other statuses like 'sending' or 'error' could be handled here
      default:
        return null;
    }
  };

  const bubbleClasses = clsx(
    'relative max-w-[75%] rounded-xl px-3 py-2 shadow-sm',
    {
      'bg-primary text-primary-foreground': isSentByCurrentUser,
      'bg-muted': !isSentByCurrentUser,
    }
  );

  const containerClasses = clsx(
    'flex w-full mb-2',
    {
      'justify-end': isSentByCurrentUser,
      'justify-start': !isSentByCurrentUser,
    }
  );
  
  const metadataClasses = clsx(
    'text-xs select-none',
    {
      'text-primary-foreground/70': isSentByCurrentUser,
      'text-muted-foreground': !isSentByCurrentUser
    }
  );

  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
        <div className="flex items-center gap-1.5 float-right clear-both ml-4 mt-1">
            <span className={metadataClasses}>
                {timestamp}
            </span>
            <div className={metadataClasses}>
                <StatusIcon />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;