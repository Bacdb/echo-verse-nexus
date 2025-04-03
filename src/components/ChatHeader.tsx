
import React from 'react';
import { Menu, Settings, Moon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  toggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ toggleSidebar, activeTab, setActiveTab }) => {
  return (
    <header className="p-4 border-b border-white/10 glass-morphism flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold purple-gradient">EchoVerse Nexus</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <nav className="hidden md:flex items-center gap-2">
          <Button 
            variant={activeTab === 'chat' ? "default" : "ghost"} 
            onClick={() => setActiveTab('chat')}
            className="transition-all duration-300"
          >
            Chat
          </Button>
          <Button 
            variant={activeTab === 'data' ? "default" : "ghost"} 
            onClick={() => setActiveTab('data')}
            className="transition-all duration-300"
          >
            My Data
          </Button>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-morphism border border-white/10">
            <DropdownMenuItem className="cursor-pointer">
              <Users className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Moon className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default ChatHeader;
