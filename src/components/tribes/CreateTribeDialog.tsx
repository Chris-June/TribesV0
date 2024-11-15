import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Hash, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTribes } from '@/contexts/TribesContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface CreateTribeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'details' | 'privacy' | 'channels';

interface TribeFormData {
  name: string;
  description: string;
  category: string;
  privacy: 'public' | 'private';
  memberApproval: 'automatic' | 'manual';
  channels: string[];
  image?: File;
}

const initialFormData: TribeFormData = {
  name: '',
  description: '',
  category: '',
  privacy: 'public',
  memberApproval: 'automatic',
  channels: ['general', 'announcements'],
};

const categories = [
  'Gaming',
  'Technology',
  'Art & Design',
  'Music',
  'Education',
  'Science',
  'Sports',
  'Entertainment',
  'Business',
  'Other',
];

export default function CreateTribeDialog({ open, onOpenChange }: CreateTribeDialogProps) {
  const [step, setStep] = useState<Step>('details');
  const [formData, setFormData] = useState<TribeFormData>(initialFormData);
  const [newChannel, setNewChannel] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { dispatch } = useTribes();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddChannel = () => {
    if (newChannel.trim() && !formData.channels.includes(newChannel.trim())) {
      setFormData((prev) => ({
        ...prev,
        channels: [...prev.channels, newChannel.trim()],
      }));
      setNewChannel('');
    }
  };

  const handleRemoveChannel = (channel: string) => {
    if (channel !== 'general' && channel !== 'announcements') {
      setFormData((prev) => ({
        ...prev,
        channels: prev.channels.filter((c) => c !== channel),
      }));
    }
  };

  const handleNext = () => {
    if (step === 'details') setStep('privacy');
    else if (step === 'privacy') setStep('channels');
  };

  const handleBack = () => {
    if (step === 'privacy') setStep('details');
    else if (step === 'channels') setStep('privacy');
  };

  const handleSubmit = () => {
    if (!user) return;

    const newTribe = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      image: imagePreview || `https://source.unsplash.com/random/400x400?${formData.category.toLowerCase()}`,
      category: formData.category,
      privacy: formData.privacy,
      memberApproval: formData.memberApproval,
      channels: formData.channels,
      createdBy: user.id,
      members: 1,
    };

    dispatch({ type: 'ADD_TRIBE', tribe: newTribe });
    toast({
      title: 'Success',
      description: 'Your tribe has been created!',
    });

    onOpenChange(false);
    setStep('details');
    setFormData(initialFormData);
    setImagePreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a New Tribe</DialogTitle>
        </DialogHeader>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Tribe Image</Label>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative overflow-hidden"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-muted-foreground/25" />
                        )}
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Recommended size: 256x256px
                        <br />
                        Maximum size: 5MB
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Tribe Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter tribe name..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="What's your tribe about?"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Privacy Setting</Label>
                    <RadioGroup
                      value={formData.privacy}
                      onValueChange={(value: 'public' | 'private') =>
                        setFormData((prev) => ({ ...prev, privacy: value }))
                      }
                      className="grid grid-cols-1 gap-4"
                    >
                      <Label
                        htmlFor="public"
                        className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer"
                      >
                        <RadioGroupItem value="public" id="public" />
                        <div className="space-y-1">
                          <div className="font-medium leading-none flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Public
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Anyone can join and view tribe content
                          </div>
                        </div>
                      </Label>
                      <Label
                        htmlFor="private"
                        className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer"
                      >
                        <RadioGroupItem value="private" id="private" />
                        <div className="space-y-1">
                          <div className="font-medium leading-none flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Private
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Only approved members can join and view content
                          </div>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Member Approval</Label>
                    <RadioGroup
                      value={formData.memberApproval}
                      onValueChange={(value: 'automatic' | 'manual') =>
                        setFormData((prev) => ({ ...prev, memberApproval: value }))
                      }
                      className="grid grid-cols-1 gap-4"
                    >
                      <Label
                        htmlFor="automatic"
                        className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer"
                      >
                        <RadioGroupItem value="automatic" id="automatic" />
                        <div className="space-y-1">
                          <div className="font-medium leading-none">Automatic</div>
                          <div className="text-sm text-muted-foreground">
                            New members are approved automatically
                          </div>
                        </div>
                      </Label>
                      <Label
                        htmlFor="manual"
                        className="flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer"
                      >
                        <RadioGroupItem value="manual" id="manual" />
                        <div className="space-y-1">
                          <div className="font-medium leading-none">Manual</div>
                          <div className="text-sm text-muted-foreground">
                            Admins must approve new members
                          </div>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'channels' && (
              <motion.div
                key="channels"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="channel">Add Channel</Label>
                      <Input
                        id="channel"
                        value={newChannel}
                        onChange={(e) => setNewChannel(e.target.value)}
                        placeholder="Enter channel name..."
                      />
                    </div>
                    <Button
                      onClick={handleAddChannel}
                      disabled={!newChannel.trim()}
                    >
                      Add
                    </Button>
                  </div>

                  <ScrollArea className="h-[200px] rounded-md border p-2">
                    <div className="space-y-2">
                      {formData.channels.map((channel) => (
                        <div
                          key={channel}
                          className="flex items-center justify-between rounded-lg border px-4 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            {channel}
                          </div>
                          {channel !== 'general' && channel !== 'announcements' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveChannel(channel)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 'details'}
          >
            Back
          </Button>
          <Button
            onClick={step === 'channels' ? handleSubmit : handleNext}
            disabled={!formData.name.trim() && step === 'details'}
          >
            {step === 'channels' ? 'Create Tribe' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}