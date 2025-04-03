
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModelSelector from '@/components/ModelSelector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');

  // Load stored Supabase config on component mount
  useEffect(() => {
    const storedUrl = localStorage.getItem('supabaseUrl') || '';
    const storedKey = localStorage.getItem('supabaseKey') || '';
    setSupabaseUrl(storedUrl);
    setSupabaseKey(storedKey);
  }, []);

  const saveSupabaseConfig = () => {
    localStorage.setItem('supabaseUrl', supabaseUrl);
    localStorage.setItem('supabaseKey', supabaseKey);
    toast.success('Supabase configuration saved');
  };

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
          <Tabs defaultValue="api" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-futuristic-dark/60">
              <TabsTrigger value="api">AI Models</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
            </TabsList>
            
            <TabsContent value="api">
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
            </TabsContent>
            
            <TabsContent value="database">
              <h2 className="text-lg font-medium mb-4">Supabase Configuration</h2>
              <p className="text-sm text-white/70 mb-6">
                Connect to your local Supabase instance to enable database functionality.
              </p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supabaseUrl">Supabase URL</Label>
                  <Input 
                    id="supabaseUrl"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="e.g., http://self-hosted-ai-starter-kit:8000"
                    className="bg-futuristic-dark/80 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supabaseKey">Supabase Anon Key</Label>
                  <Input 
                    id="supabaseKey"
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    type="password"
                    placeholder="Your Supabase anon key"
                    className="bg-futuristic-dark/80 border-white/10"
                  />
                </div>
                
                <Button 
                  onClick={saveSupabaseConfig} 
                  className="w-full bg-futuristic-purple hover:bg-futuristic-purple/90 mt-4"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
                
                <div className="p-4 rounded-md border border-white/10 bg-futuristic-dark/50 mt-4">
                  <h3 className="text-sm font-medium mb-2">About Local Supabase</h3>
                  <p className="text-xs text-white/70">
                    Enter the URL of your self-hosted Supabase instance and the anon key. 
                    For a local network named "self-hosted-ai-starter-kit", you may use 
                    something like "http://self-hosted-ai-starter-kit:8000" as the URL.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
