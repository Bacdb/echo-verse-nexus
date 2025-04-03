
import React from 'react';
import { User, Bot } from 'lucide-react';

export type MessageType = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Array<{
    id: string;
    type: 'image' | 'file';
    url: string;
    name: string;
  }>;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`${isUser ? 'order-2' : 'order-1'} mx-2`}>
        <div className={`h-8 w-8 rounded-full ${isUser ? 'bg-futuristic-purple/30' : 'bg-futuristic-blue/30'} flex items-center justify-center`}>
          {isUser ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </div>
      </div>
      
      <div className={`max-w-[80%] flex flex-col ${isUser ? 'order-1 items-end' : 'order-2 items-start'}`}>
        <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          
          {/* Display attachments if any */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="rounded-md overflow-hidden border border-white/10">
                  {attachment.type === 'image' ? (
                    <img 
                      src={attachment.url} 
                      alt={attachment.name} 
                      className="max-h-40 w-auto object-cover"
                    />
                  ) : (
                    <div className="p-2 text-sm bg-white/5 flex items-center gap-2">
                      <span>{attachment.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <span className="text-xs text-white/50 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
