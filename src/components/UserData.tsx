
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for user uploads
const mockImages = [
  { id: '1', name: 'project-screenshot.png', url: 'https://picsum.photos/200/300', date: '2023-09-15' },
  { id: '2', name: 'profile-image.jpg', url: 'https://picsum.photos/200/301', date: '2023-09-10' },
  { id: '3', name: 'design-mockup.png', url: 'https://picsum.photos/200/302', date: '2023-09-05' },
  { id: '4', name: 'banner.jpg', url: 'https://picsum.photos/200/303', date: '2023-09-01' },
];

const mockFiles = [
  { id: '1', name: 'requirements.pdf', type: 'PDF Document', size: '2.4 MB', date: '2023-09-15' },
  { id: '2', name: 'project-data.csv', type: 'CSV File', size: '456 KB', date: '2023-09-10' },
  { id: '3', name: 'user-guide.docx', type: 'Word Document', size: '1.2 MB', date: '2023-09-05' },
  { id: '4', name: 'api-spec.json', type: 'JSON File', size: '85 KB', date: '2023-09-01' },
];

const UserData: React.FC = () => {
  const [images, setImages] = useState(mockImages);
  const [files, setFiles] = useState(mockFiles);
  
  const handleDelete = (id: string, type: 'image' | 'file') => {
    if (type === 'image') {
      setImages(prev => prev.filter(image => image.id !== id));
    } else {
      setFiles(prev => prev.filter(file => file.id !== id));
    }
    toast.success(`${type === 'image' ? 'Image' : 'File'} deleted successfully`);
  };
  
  return (
    <div className="p-4 h-full">
      <h2 className="text-2xl font-bold mb-6 purple-gradient">My Uploaded Data</h2>
      
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 bg-futuristic-dark/60">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="space-y-4">
          {images.length === 0 ? (
            <div className="text-center py-12 bg-futuristic-darker/50 rounded-lg border border-white/5">
              <p className="text-white/70">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map(image => (
                <div 
                  key={image.id}
                  className="rounded-lg overflow-hidden border border-white/10 bg-futuristic-darker/50 group"
                >
                  <div className="relative h-40">
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDelete(image.id, 'image')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium truncate">{image.name}</p>
                    <p className="text-sm text-white/60">{image.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="files" className="space-y-4">
          {files.length === 0 ? (
            <div className="text-center py-12 bg-futuristic-darker/50 rounded-lg border border-white/5">
              <p className="text-white/70">No files uploaded yet</p>
            </div>
          ) : (
            <div className="bg-futuristic-darker/50 rounded-lg border border-white/10 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 font-medium text-white/80">
                <div className="col-span-2">Name</div>
                <div>Type</div>
                <div>Size</div>
                <div>Actions</div>
              </div>
              {files.map(file => (
                <div key={file.id} className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div className="col-span-2 truncate">{file.name}</div>
                  <div>{file.type}</div>
                  <div>{file.size}</div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleDelete(file.id, 'file')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserData;
