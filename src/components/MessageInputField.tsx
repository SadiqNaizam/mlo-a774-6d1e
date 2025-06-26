import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';

interface MessageInputFieldProps {
  onSendMessage: (message: string) => void;
  isSending?: boolean;
}

const MessageInputField: React.FC<MessageInputFieldProps> = ({ onSendMessage, isSending = false }) => {
  const [message, setMessage] = useState('');
  console.log('MessageInputField loaded');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter, but allow Shift+Enter for a new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // We can't submit the form directly here, so we'll just trigger the button click
      // or recreate the logic. It's cleaner to trigger the form's submit event.
      // This will call handleSendMessage.
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      <form
        onSubmit={handleSendMessage}
        className="flex items-start w-full space-x-2"
      >
        <Textarea
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 resize-none min-h-[40px]"
          disabled={isSending}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isSending}
          aria-label="Send message"
        >
          <SendHorizontal className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInputField;