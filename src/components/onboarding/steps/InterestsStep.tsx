import { motion } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Compass } from 'lucide-react';
import { Users } from 'lucide-react';

const interests = [
  'Technology', 'Gaming', 'Art', 'Music', 'Sports',
  'Fitness', 'Books', 'Movies', 'Food', 'Travel',
  'Photography', 'Fashion', 'Science', 'Education', 'Business',
  'Nature', 'Pets', 'DIY', 'Writing', 'Cooking'
];

export default function InterestsStep() {
  const { state, updateUserInterests, setCurrentStep, completeStep } = useOnboarding();

  const toggleInterest = (interest: string) => {
    const currentInterests = state.userInterests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    updateUserInterests(newInterests);
  };

  const handleContinue = () => {
    if (state.userInterests.length >= 3) {
      completeStep('interests');
      setCurrentStep(2);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Select Your Interests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p>Choose at least 3 topics you're interested in to help us personalize your experience.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge
                key={interest}
                variant={state.userInterests.includes(interest) ? "default" : "outline"}
                className="cursor-pointer text-sm py-1 px-3"
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Selected: {state.userInterests.length} / 3 minimum
            </p>

            {state.userInterests.length >= 3 && state.recommendedTribes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <h3 className="font-medium text-center">Recommended Tribes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {state.recommendedTribes.map((tribe) => (
                    <Card key={tribe} className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{tribe}</p>
                          <p className="text-xs text-muted-foreground">Join now</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleContinue}
              className="w-full"
              disabled={state.userInterests.length < 3}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
