import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Settings,
  Users,
  PlusCircle,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import CreateTribeDialog from '@/components/tribes/CreateTribeDialog';
import { useTribes } from '@/contexts/TribesContext';
import { useAuth } from '@/contexts/AuthContext';

const mainLinks = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/explore', icon: Compass, label: 'Explore' },
];

export default function Sidebar() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { state: { tribes } } = useTribes();
  const { signOut } = useAuth();

  return (
    <>
      <motion.div
        className="w-16 bg-card border-r flex flex-col"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="p-2 space-y-2">
          {mainLinks.map(({ to, icon: Icon, label }) => (
            <Tooltip key={to} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink to={to}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="icon"
                      className="w-full"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{label}</span>
                    </Button>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <Separator className="my-2" />

        <ScrollArea className="flex-1 w-full">
          <div className="p-2 space-y-2">
            {tribes.map((tribe) => (
              <Tooltip key={tribe.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <NavLink to={`/tribe/${tribe.id}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        size="icon"
                        className="w-full relative"
                      >
                        <img
                          src={tribe.image}
                          alt={tribe.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </Button>
                    )}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{tribe.name}</TooltipContent>
              </Tooltip>
            ))}

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full"
                  onClick={() => setCreateDialogOpen(true)}
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Create Tribe</TooltipContent>
            </Tooltip>
          </div>
        </ScrollArea>

        <div className="p-2 space-y-2">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink to="/settings">
                {({ isActive }) => (
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="icon"
                    className="w-full"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                )}
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-full"
                onClick={signOut}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </div>
      </motion.div>

      <CreateTribeDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}