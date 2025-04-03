
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

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
];

const ModelSelector: React.FC = () => {
  return (
    <div className="w-full mb-4">
      <label className="text-sm text-white/70 mb-1 block">AI Model</label>
      <Select defaultValue="gpt-4o">
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
    </div>
  );
};

export default ModelSelector;
