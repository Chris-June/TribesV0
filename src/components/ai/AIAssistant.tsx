import { useState } from 'react';
import { Bot, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDropzone } from 'react-dropzone';
import { generateImage, getAIResponse, processDocument } from '@/lib/ai/openai';
import { useToast } from '@/components/ui/use-toast';

interface AIAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AIAssistant({ open, onOpenChange }: AIAssistantProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [documentContent, setDocumentContent] = useState('');
  const [processedResult, setProcessedResult] = useState('');
  const { toast } = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/*': ['.txt', '.md'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const text = await file.text();
        setDocumentContent(text);
      }
    },
  });

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    setLoading(true);
    try {
      const response = await getAIResponse([
        { role: 'user', content: chatInput },
      ]);
      toast({
        title: 'AI Response',
        description: response,
      });
      setChatInput('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get AI response',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageGenerate = async () => {
    if (!imagePrompt.trim()) return;

    setLoading(true);
    try {
      const imageUrl = await generateImage(imagePrompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate image',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentProcess = async (type: 'summarize' | 'analyze' | 'extract') => {
    if (!documentContent.trim()) return;

    setLoading(true);
    try {
      const result = await processDocument(documentContent, type);
      setProcessedResult(result);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process document',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 mt-4"
          >
            <div className="space-y-2">
              <Label>Ask anything</Label>
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your question..."
                className="min-h-[100px]"
              />
            </div>
            <Button
              onClick={handleChatSubmit}
              disabled={loading || !chatInput.trim()}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get AI Response
            </Button>
          </motion.div>
        );

      case 'image':
        return (
          <motion.div
            key="image"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 mt-4"
          >
            <div className="space-y-2">
              <Label>Image prompt</Label>
              <Input
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
              />
            </div>
            <Button
              onClick={handleImageGenerate}
              disabled={loading || !imagePrompt.trim()}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Image
            </Button>
            {generatedImage && (
              <div className="mt-4">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="rounded-lg w-full"
                />
              </div>
            )}
          </motion.div>
        );

      case 'document':
        return (
          <motion.div
            key="document"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 mt-4"
          >
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input {...getInputProps()} />
              <p className="text-muted-foreground">
                Drag & drop a document here, or click to select
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: TXT, MD, PDF
              </p>
            </div>

            {documentContent && (
              <>
                <div className="space-y-2">
                  <Label>Document content</Label>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <pre className="text-sm">{documentContent}</pre>
                  </ScrollArea>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDocumentProcess('summarize')}
                    disabled={loading}
                    className="flex-1"
                  >
                    Summarize
                  </Button>
                  <Button
                    onClick={() => handleDocumentProcess('analyze')}
                    disabled={loading}
                    className="flex-1"
                  >
                    Analyze
                  </Button>
                  <Button
                    onClick={() => handleDocumentProcess('extract')}
                    disabled={loading}
                    className="flex-1"
                  >
                    Extract Data
                  </Button>
                </div>

                {processedResult && (
                  <div className="space-y-2">
                    <Label>Results</Label>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                      <div className="text-sm whitespace-pre-wrap">
                        {processedResult}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </>
            )}
          </motion.div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>AI Assistant</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Image
            </TabsTrigger>
            <TabsTrigger value="document" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}