import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  MessageSquare,
  Users,
  Search,
  Bell,
  Settings,
  Calendar,
  FileText,
  Image,
} from 'lucide-react';

const tutorialSteps = [
  {
    title: 'Discover Tribes',
    description: 'Find and join communities that match your interests.',
    icon: Search,
    highlight: '#explore-button',
  },
  {
    title: 'Join Discussions',
    description: 'Engage in meaningful conversations with tribe members.',
    icon: MessageSquare,
    highlight: '#messages-button',
  },
  {
    title: 'Connect with Members',
    description: 'Build relationships with like-minded individuals.',
    icon: Users,
    highlight: '#members-button',
  },
  {
    title: 'Stay Updated',
    description: 'Get notified about tribe activities and mentions.',
    icon: Bell,
    highlight: '#notifications-button',
  },
  {
    title: 'Manage Events',
    description: 'Create and join tribe events and meetups.',
    icon: Calendar,
    highlight: '#events-button',
  },
  {
    title: 'Share Content',
    description: 'Share photos, documents, and other media with your tribes.',
    icon: Image,
    highlight: '#share-button',
  },
  {
    title: 'Customize Settings',
    description: 'Personalize your tribe experience and notifications.',
    icon: Settings,
    highlight: '#settings-button',
  },
];

export default function TutorialGuide() {
  const { completeTutorial } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {React.createElement(tutorialSteps[currentStep].icon, {
                    className: "h-6 w-6 text-primary",
                  })}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {tutorialSteps[currentStep].title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tutorialSteps[currentStep].description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {currentStep + 1} of {tutorialSteps.length}
                  </span>
                  <Button onClick={handleNext}>
                    {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
