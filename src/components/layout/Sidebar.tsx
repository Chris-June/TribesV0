import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Settings,
  PlusCircle,
  LogOut,
  Users,
  Hash,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import CreateTribeDialog from '@/components/tribes/CreateTribeDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useTribes } from '@/contexts/TribesContext';
import { INTELLISYNC_TRIBE_ID } from '@/constants/defaultTribe';
import { ScrollArea } from '@/components/ui/scroll-area';

const mainLinks = [
  { to: '/app', icon: Home, label: 'Home' },
  { to: '/app/explore', icon: Compass, label: 'Explore' },
  { to: '/app/profile', icon: UserCircle, label: 'Profile' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { signOut } = useAuth();
  const { state } = useTribes();

  // Filter out the IntelliSync Community from user tribes as it has its own button
  const userTribes = state.userTribes.filter(tribe => tribe.id !== INTELLISYNC_TRIBE_ID);

  return (
    <>
      <motion.div
        className="w-16 bg-card border-r flex flex-col h-screen"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="p-2 space-y-2">
          {/* Main navigation links */}
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
              <TooltipContent side="right">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          <Separator className="my-2" />

          {/* IntelliSync Community button */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink to={`/app/tribes/${INTELLISYNC_TRIBE_ID}`}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="icon"
                    className="w-full relative"
                  >
                    <Users className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                    <span className="sr-only">IntelliSync Community</span>
                  </Button>
                )}
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>IntelliSync Community</p>
            </TooltipContent>
          </Tooltip>

          <Separator className="my-2" />

          {/* Create Tribe Button */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-full"
                onClick={() => setCreateDialogOpen(true)}
              >
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">Create Tribe</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Create Tribe</p>
            </TooltipContent>
          </Tooltip>

          {/* User's Tribes */}
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-2">
              {userTribes.map((tribe) => (
                <Tooltip key={tribe.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <NavLink to={`/app/tribes/${tribe.id}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? 'default' : 'ghost'}
                          size="icon"
                          className="w-full"
                        >
                          <Hash className="h-5 w-5" />
                          <span className="sr-only">{tribe.name}</span>
                        </Button>
                      )}
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{tribe.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-auto">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full"
                  onClick={signOut}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sign Out</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Sign Out</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </motion.div>

      <CreateTribeDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}