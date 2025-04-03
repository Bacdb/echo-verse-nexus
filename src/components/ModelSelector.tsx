
import React, { useState } from 'react';
import { Check, ChevronDown, Key } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Model {
  id: string;
  name: string;
  description: string;
}

const models: Model[] = [
  { 
    id: 'gpt-4o', 
    name: 'GPT-4o', 
    description: 'Most capable model for complex tasks' 
  },
  { 
    id: 'gpt-4o-mini', 
    name: 'GPT-4o Mini', 
    description: 'Fast and efficient for everyday tasks' 
  },
  { 
    id: 'claude-3-5-sonnet', 
    name: 'Claude 3.5 Sonnet', 
    description: 'Balanced between intelligence and speed' 
  },
  { 
    id: 'llama-3', 
    name: 'Llama 3', 
    description: 'Open source with strong reasoning capabilities' 
  },
  { 
    id: 'gemini-pro', 
    name: 'Gemini Pro', 
    description: 'Google\'s multimodal AI model' 
  },
];

const ModelSelector: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  // Get API key from localStorage or return empty string if not set
  const getApiKey = (modelId: string): string => {
    return localStorage.getItem(`apiKey_${modelId}`) || "";
  };

  // Save API key to localStorage
  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem(`apiKey_${selectedModel}`, apiKey);
      toast({
        title: "API Key Saved",
        description: `Your API key for ${models.find(m => m.id === selectedModel)?.name} has been saved.`,
      });
      setIsApiKeyDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
    }
  };

  // Open API key dialog with current key for the model
  const openApiKeyDialog = (modelId: string) => {
    setSelectedModel(modelId);
    setApiKey(getApiKey(modelId));
    setIsApiKeyDialogOpen(true);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  return (
    <div className="w-full mb-4">
      <label className="text-sm text-white/70 mb-1 block">AI Model</label>
      <div className="flex gap-2">
        <Select value={selectedModel} onValueChange={handleModelChange}>
          <SelectTrigger className="w-full bg-futuristic-dark/80 border-white/10">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent className="glass-morphism border-white/10">
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id} className="focus:bg-futuristic-purple/20">
                <div className="flex flex-col">
                  <span>{model.name}</span>
                  <span className="text-xs text-white/60">{model.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-futuristic-dark/80 border-white/10 hover:bg-futuristic-purple/20"
          onClick={() => openApiKeyDialog(selectedModel)}
        >
          <Key className="h-4 w-4" />
        </Button>
      </div>

      {/* API Key Dialog */}
      <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
        <DialogContent className="glass-morphism border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Set API Key</DialogTitle>
            <DialogDescription className="text-white/70">
              Enter your API key for {models.find(m => m.id === selectedModel)?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <Input 
                id="apiKey" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="col-span-3 bg-futuristic-dark/80 border-white/10"
                type="password"
                placeholder="Enter your API key"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={saveApiKey}
              className="bg-futuristic-purple hover:bg-futuristic-purple/90"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelSelector;
