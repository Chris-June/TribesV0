import { motion } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { UserCircle } from 'lucide-react';

export default function ProfileStep() {
  const { state, updateUserProfile, setCurrentStep, completeStep } = useOnboarding();

  const handleProfileUpdate = (field: string, value: string) => {
    updateUserProfile({ [field]: value });
  };

  const handleContinue = () => {
    if (state.userProfile.displayName && state.userProfile.bio) {
      completeStep('profile');
      setCurrentStep(3);
    }
  };

  const isValid = state.userProfile.displayName && state.userProfile.bio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCircle className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p>Tell others about yourself to make meaningful connections.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                placeholder="How should we call you?"
                value={state.userProfile.displayName}
                onChange={(e) => handleProfileUpdate('displayName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a bit about yourself..."
                value={state.userProfile.bio}
                onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                placeholder="Where are you based?"
                value={state.userProfile.location}
                onChange={(e) => handleProfileUpdate('location', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Label>Social Links (Optional)</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Twitter username"
                  value={state.userProfile.socialLinks.twitter || ''}
                  onChange={(e) =>
                    updateUserProfile({
                      socialLinks: { ...state.userProfile.socialLinks, twitter: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="GitHub username"
                  value={state.userProfile.socialLinks.github || ''}
                  onChange={(e) =>
                    updateUserProfile({
                      socialLinks: { ...state.userProfile.socialLinks, github: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="LinkedIn username"
                  value={state.userProfile.socialLinks.linkedin || ''}
                  onChange={(e) =>
                    updateUserProfile({
                      socialLinks: { ...state.userProfile.socialLinks, linkedin: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full"
            disabled={!isValid}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
