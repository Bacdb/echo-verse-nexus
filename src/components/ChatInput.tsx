
import React, { useState, useRef } from 'react';
import { 
  Mic, MicOff, Image, Paperclip, Send, X, Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (content: string, attachments?: Array<{
    id: string;
    type: 'image' | 'file';
    url: string;
    name: string;
  }>) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<Array<{
    id: string;
    type: 'image' | 'file';
    url: string;
    name: string;
  }>>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) return;
    
    onSendMessage(message, attachments);
    setMessage('');
    setAttachments([]);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success('Voice message recorded');
      // In a real implementation, we would process the recording here
    } else {
      setIsRecording(true);
      toast.info('Recording voice message...');
      // In a real implementation, we would start recording here
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real implementation, we would upload the file to a server
    // and get back the URL. Here we're creating an object URL.
    Array.from(files).forEach(file => {
      const id = Math.random().toString(36).substring(2, 9);
      const url = URL.createObjectURL(file);
      
      setAttachments(prev => [...prev, {
        id,
        type,
        url,
        name: file.name
      }]);
    });
    
    // Reset the input
    e.target.value = '';
  };
  
  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };
  
  return (
    <div className="p-4 border-t border-white/10 glass-morphism">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachments.map(attachment => (
            <div 
              key={attachment.id} 
              className="relative group rounded-md overflow-hidden border border-white/10"
            >
              {attachment.type === 'image' ? (
                <img 
                  src={attachment.url} 
                  alt={attachment.name}
                  className="h-16 w-auto object-cover"
                />
              ) : (
                <div className="h-16 px-3 bg-white/5 flex items-center text-sm">
                  {attachment.name.length > 15 
                    ? `${attachment.name.substring(0, 12)}...` 
                    : attachment.name}
                </div>
              )}
              <Button
                variant="destructive"
                size="icon"
                className="h-5 w-5 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeAttachment(attachment.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[80px] w-full bg-futuristic-dark/80 border-white/10 focus:ring-futuristic-purple/30 resize-none pr-24"
          disabled={isLoading}
        />
        
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e, 'file')}
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.txt,.csv,.json"
          />
          
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleFileUpload(e, 'image')}
            className="hidden"
            multiple
            accept="image/*"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/5 hover:bg-white/10"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/5 hover:bg-white/10"
            onClick={() => imageInputRef.current?.click()}
          >
            <Image className="h-4 w-4" />
          </Button>
          
          <Button
            variant={isRecording ? "destructive" : "ghost"}
            size="icon"
            className={`h-8 w-8 ${!isRecording ? 'bg-white/5 hover:bg-white/10' : ''}`}
            onClick={toggleVoiceRecording}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 bg-futuristic-purple hover:bg-futuristic-purple-light"
            onClick={handleSendMessage}
            disabled={(!message.trim() && attachments.length === 0) || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
