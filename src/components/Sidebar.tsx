
import React from 'react';
import { X, Plus, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModelSelector from './ModelSelector';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const chatHistory = [
    { id: 1, title: "Project Planning", date: "Today" },
    { id: 2, title: "Code Review Discussion", date: "Today" },
    { id: 3, title: "UI Design Feedback", date: "Yesterday" },
    { id: 4, title: "Debugging Session", date: "Yesterday" },
    { id: 5, title: "API Integration", date: "3 days ago" },
  ];

  return (
    <div className={`fixed left-0 top-0 bottom-0 z-40 w-72 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-futuristic-darker border-r border-white/10 flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Conversations</h2>
        <Button variant="ghost" size="icon" onClick={toggle}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4">
        <Button className="w-full gap-2 mb-4">
          <Plus className="h-4 w-4" /> New Chat
        </Button>
        
        <ModelSelector />
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="p-4 space-y-2">
          {chatHistory.map((chat) => (
            <div 
              key={chat.id}
              className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-sm text-white truncate">{chat.title}</h3>
                  <p className="text-xs text-white/60">{chat.date}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-futuristic-purple/20 flex items-center justify-center">
              <span className="text-sm font-medium">UN</span>
            </div>
            <div className="text-sm">
              <p className="font-medium">User</p>
              <p className="text-white/60 text-xs">Free Plan</p>
            </div>
          </div>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
