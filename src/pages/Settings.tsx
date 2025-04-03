
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModelSelector from '@/components/ModelSelector';

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-white/10">
        <Button variant="ghost" size="icon" asChild>
          <a href="/">
            <ArrowLeft className="h-5 w-5" />
          </a>
        </Button>
        <h1 className="text-xl font-semibold ml-4">Settings</h1>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-medium mb-4">API Configuration</h2>
          <p className="text-sm text-white/70 mb-6">
            Configure API keys for different AI models to use with the application.
          </p>
          
          <div className="space-y-6">
            <ModelSelector />
            
            <div className="p-4 rounded-md border border-white/10 bg-futuristic-dark/50">
              <h3 className="text-sm font-medium mb-2">About API Keys</h3>
              <p className="text-xs text-white/70">
                API keys are stored locally in your browser and are not sent to our servers.
                You'll need to obtain API keys from the respective AI service providers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
