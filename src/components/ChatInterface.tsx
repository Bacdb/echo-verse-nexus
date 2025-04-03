
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage, { MessageType } from './ChatMessage';
import ChatInput from './ChatInput';
import { toast } from 'sonner';

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Initial welcome message
const welcomeMessage: MessageType = {
  id: generateId(),
  role: 'assistant',
  content: "Hello! I'm your AI assistant. How can I help you today?",
  timestamp: new Date(),
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (content: string, attachments?: MessageType['attachments']) => {
    // Add user message
    const userMessage: MessageType = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
      attachments,
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI processing
    setIsLoading(true);
    
    // In a real app, this would be an API call to the AI service
    setTimeout(() => {
      // Sample responses based on user input
      let responseContent = "I'm processing your request. How else can I assist you?";
      
      if (content.toLowerCase().includes('hello') || content.toLowerCase().includes('hi')) {
        responseContent = "Hello! It's nice to chat with you. How can I help you today?";
      } else if (content.toLowerCase().includes('help')) {
        responseContent = "I'm here to help! You can ask me questions, request information, or just chat. What would you like assistance with?";
      } else if (content.toLowerCase().includes('thank')) {
        responseContent = "You're welcome! Feel free to ask if you need anything else.";
      } else if (attachments && attachments.length > 0) {
        if (attachments.some(a => a.type === 'image')) {
          responseContent = "I've received your image(s). In a full implementation, I would analyze these images and provide relevant information or insights.";
        } else {
          responseContent = "I've received your file(s). In a full implementation, I would process these files and extract relevant information.";
        }
      }
      
      // Add AI response
      const aiMessage: MessageType = {
        id: generateId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      toast.success('Response received');
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        <div className="max-w-3xl mx-auto">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="chat-bubble-ai">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-futuristic-blue rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-futuristic-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-futuristic-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
