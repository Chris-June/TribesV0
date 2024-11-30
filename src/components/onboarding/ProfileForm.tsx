import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';

interface ProfileFormData {
  displayName: string;
  bio: string;
  location: string;
  website: string;
  avatar: string;
}

export default function ProfileForm() {
  const { updateProfileCompletion } = useOnboarding();
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: '',
    bio: '',
    location: '',
    website: '',
    avatar: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Calculate profile completion percentage
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== '').length;
    const completionPercentage = (filledFields / fields.length) * 100;
    updateProfileCompletion(completionPercentage);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
        updateProfileCompletion(calculateCompletion({ ...formData, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateCompletion = (data: ProfileFormData) => {
    const fields = Object.values(data);
    const filledFields = fields.filter(field => field.trim() !== '').length;
    return (filledFields / fields.length) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={formData.avatar} />
            <AvatarFallback>
              {formData.displayName?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90"
          >
            <ImagePlus className="h-4 w-4" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            placeholder="How should we call you?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Where are you based?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="Your personal website or social media"
          />
        </div>
      </div>
    </motion.div>
  );
}
