import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { TribesProvider } from '@/contexts/TribesContext';
import { DiscoveryProvider } from '@/contexts/DiscoveryContext';
import { EngagementProvider } from '@/contexts/EngagementContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import Layout from '@/components/layout/Layout';
import Landing from '@/pages/Landing';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import DiscoveryPage from '@/components/tribes/DiscoveryPage';
import ProfilePage from '@/pages/ProfilePage';
import TribePage from '@/pages/TribePage';
import Settings from '@/pages/Settings';
import TribeSettings from '@/components/tribes/TribeSettings';

// Router configuration with future flags
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

// Wrapper component for Layout and Outlet
function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app/*" element={<LayoutWrapper />}>
        <Route path="" element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="discover" element={<DiscoveryPage />} />
        <Route path="tribes/:id" element={<TribePage />} />
        <Route path="tribes/:id/settings" element={<TribeSettings />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="tribes-theme">
      <TooltipProvider>
        <AuthProvider>
          <TribesProvider>
            <DiscoveryProvider>
              <EngagementProvider>
                <OnboardingProvider>
                  <Router {...routerConfig}>
                    <AppContent />
                    <Toaster />
                  </Router>
                </OnboardingProvider>
              </EngagementProvider>
            </DiscoveryProvider>
          </TribesProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}