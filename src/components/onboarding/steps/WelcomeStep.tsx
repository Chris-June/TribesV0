import { motion } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyPopper } from 'lucide-react';

export default function WelcomeStep() {
  const { setCurrentStep, completeStep } = useOnboarding();

  const handleContinue = () => {
    completeStep('welcome');
    setCurrentStep(1);
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
            <PartyPopper className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to Tribes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p>
              Join communities that share your interests and passions. Connect with
              like-minded people, share experiences, and grow together.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-2">Find Your Tribes</h3>
                <p className="text-sm text-muted-foreground">
                  Discover communities that match your interests
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-2">Share & Connect</h3>
                <p className="text-sm text-muted-foreground">
                  Engage with others who share your passions
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Achieve milestones and earn rewards
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground">
                  Never miss important tribe activities
                </p>
              </div>
            </div>
          </div>

          <Button onClick={handleContinue} className="w-full">
            Let's Get Started
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
