import { motion } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

const tutorialSteps = [
  {
    title: 'Join Recommended Tribes',
    description: 'Start by joining the tribes we recommended based on your interests. These communities are perfect for you.',
    icon: '🎯',
  },
  {
    title: 'Introduce Yourself',
    description: 'Make a great first impression by introducing yourself to your new tribe members.',
    icon: '👋',
  },
  {
    title: 'Participate in Challenges',
    description: 'Take part in tribe challenges to earn rewards and connect with fellow members.',
    icon: '🏆',
  },
  {
    title: 'Track Your Progress',
    description: 'Monitor your tribe activity, achievements, and milestones. Stay motivated with progress tracking.',
    icon: '📈',
  },
  {
    title: 'Engage & Connect',
    description: 'Participate in discussions, share content, and connect with tribe members who share your interests.',
    icon: '🤝',
  },
  {
    title: 'Stay Updated',
    description: 'Get notifications about tribe activities, new posts, and important updates.',
    icon: '🔔',
  },
];

export default function TutorialStep() {
  const { state, completeStep, completeOnboarding } = useOnboarding();

  const handleComplete = () => {
    completeStep('tutorial');
    completeOnboarding();
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
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Quick Tour</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            <p>Let's get you started with your recommended tribes!</p>
            {state.recommendedTribes.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Your Recommended Tribes:</p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {state.recommendedTribes.map((tribe) => (
                    <Badge key={tribe} variant="secondary">
                      {tribe}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {tutorialSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-card border"
              >
                <div className="text-2xl">{step.icon}</div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button onClick={handleComplete} className="w-full">
            Start Exploring Tribes
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
