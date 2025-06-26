import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationHeader from "@/components/ConversationHeader";
import ChatMessageBubble from "@/components/ChatMessageBubble";
import MessageInputField from "@/components/MessageInputField";

// Define the type for a message object
interface Message {
  id: number;
  message: string;
  timestamp: string;
  isSentByCurrentUser: boolean;
  status: 'sent' | 'delivered' | 'read' | 'sending' | 'error';
}

// Placeholder data for an initial conversation
const initialMessages: Message[] = [
  { id: 1, message: "Hey, are you free to talk later?", timestamp: "10:00 AM", isSentByCurrentUser: false, status: 'read' },
  { id: 2, message: "Yeah, definitely! How about around 3 PM?", timestamp: "10:01 AM", isSentByCurrentUser: true, status: 'read' },
  { id: 3, message: "Perfect, sounds good. I'll call you then.", timestamp: "10:02 AM", isSentByCurrentUser: false, status: 'read' },
  { id: 4, message: "Great! Talk to you soon.", timestamp: "10:03 AM", isSentByCurrentUser: true, status: 'delivered' },
];

const ConversationPage = () => {
  console.log('ConversationPage loaded');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const scrollAreaEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the messages list when new messages are added
  useEffect(() => {
    scrollAreaEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (newMessageText: string) => {
    setIsSending(true);
    // Simulate a network delay
    setTimeout(() => {
      const newMessage: Message = {
        id: messages.length + 1,
        message: newMessageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSentByCurrentUser: true,
        status: 'sent',
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setIsSending(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ConversationHeader
        contactName="Jane Doe"
        contactStatus="Online"
        contactAvatarUrl="https://i.pravatar.cc/150?u=jane_doe"
      />

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((msg) => (
            <ChatMessageBubble
              key={msg.id}
              message={msg.message}
              timestamp={msg.timestamp}
              isSentByCurrentUser={msg.isSentByCurrentUser}
              status={msg.status}
            />
          ))}
          {/* This empty div is the target for our auto-scrolling */}
          <div ref={scrollAreaEndRef} />
        </div>
      </ScrollArea>

      <MessageInputField
        onSendMessage={handleSendMessage}
        isSending={isSending}
      />
    </div>
  );
};

export default ConversationPage;