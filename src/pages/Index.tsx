
import React, { useState } from 'react';
import ChatHeader from '@/components/ChatHeader';
import ChatInterface from '@/components/ChatInterface';
import Sidebar from '@/components/Sidebar';
import UserData from '@/components/UserData';

const Index: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Overlay for mobile sidebar
  const SidebarOverlay = () => (
    <div 
      className={`fixed inset-0 bg-black/50 z-30 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={toggleSidebar}
    />
  );
  
  return (
    <div className="flex flex-col h-screen bg-futuristic-dark text-white">
      <ChatHeader 
        toggleSidebar={toggleSidebar} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="flex-1 overflow-hidden relative">
        <SidebarOverlay />
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        
        <main className="h-full overflow-hidden">
          {activeTab === 'chat' ? (
            <ChatInterface />
          ) : (
            <UserData />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
