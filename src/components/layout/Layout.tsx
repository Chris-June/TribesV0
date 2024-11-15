import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import Tribe from '@/pages/Tribe';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import Landing from '@/pages/Landing';
import { useAuth } from '@/contexts/AuthContext';

export default function Layout() {
  const { user } = useAuth();

  if (!user) {
    return <Landing />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <TopBar />
        <motion.div
          className="flex-1 overflow-auto p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/tribe/:id" element={<Tribe />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  );
}