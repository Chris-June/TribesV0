import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Users, Bot, MessageSquare, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Users,
    title: 'Community-First',
    description: 'Build and join thriving communities with shared interests',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Advanced security features to keep your tribes safe',
  },
  {
    icon: Bot,
    title: 'AI Integration',
    description: 'Powerful AI tools to enhance your community experience',
  },
  {
    icon: MessageSquare,
    title: 'Rich Messaging',
    description: 'Feature-rich communication with multimedia support',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Stay connected with instant messaging and notifications',
  },
  {
    icon: Image,
    title: 'Media Sharing',
    description: 'Share and organize images, videos, and documents effortlessly',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Bypass auth for testing and go directly to app home
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-fuchsia-500/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
              Connect, Create, Thrive
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100/80 max-w-3xl mx-auto">
              Join the next generation of community platforms. Build your tribe, share your passion, and grow together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg border-indigo-200/20 hover:bg-indigo-200/10"
                onClick={handleGetStarted}
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
              Everything You Need
            </h2>
            <p className="text-xl text-indigo-100/60 max-w-2xl mx-auto">
              Powerful features to help you build and manage your communities effectively
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
                  <feature.icon className="h-12 w-12 text-indigo-300 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-indigo-100/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-pink-200">
              Ready to Build Your Tribe?
            </h2>
            <p className="text-xl text-indigo-100/80 max-w-2xl mx-auto">
              Join thousands of communities already thriving on our platform. Start your journey today.
            </p>
            <Button
              size="lg"
              className="text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              onClick={handleGetStarted}
            >
              Start For Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}