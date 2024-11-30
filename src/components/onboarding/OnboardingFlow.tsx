import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Progress } from '@/components/ui/progress';
import WelcomeStep from './steps/WelcomeStep';
import InterestsStep from './steps/InterestsStep';
import ProfileStep from './steps/ProfileStep';
import TutorialStep from './steps/TutorialStep';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: 'Welcome',
    component: WelcomeStep,
  },
  {
    title: 'Interests',
    component: InterestsStep,
  },
  {
    title: 'Profile',
    component: ProfileStep,
  },
  {
    title: 'Tutorial',
    component: TutorialStep,
  },
];

export default function OnboardingFlow() {
  const { state } = useOnboarding();
  const navigate = useNavigate();

  // Redirect to app if onboarding is completed
  useEffect(() => {
    if (state.isCompleted) {
      navigate('/');
    }
  }, [state.isCompleted, navigate]);

  const currentStep = steps[state.currentStep];
  const progress = ((state.currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Step {state.currentStep + 1} of {steps.length}</span>
          <span className="text-muted-foreground">{currentStep.title}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full"
        >
          {currentStep && <currentStep.component />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
