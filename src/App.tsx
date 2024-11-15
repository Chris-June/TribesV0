import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { MessagesProvider } from '@/contexts/MessagesContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TribesProvider } from '@/contexts/TribesContext';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Layout from '@/components/layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TribesProvider>
          <ThemeProvider defaultTheme="dark" storageKey="tribes-theme">
            <MessagesProvider>
              <TooltipProvider>
                <Layout />
                <Toaster position="top-center" />
              </TooltipProvider>
            </MessagesProvider>
          </ThemeProvider>
        </TribesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}