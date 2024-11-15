import { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('tribes-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signIn = async (email: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    const mockUser = {
      id: '1',
      email,
      name: 'John Doe',
      avatar: 'https://source.unsplash.com/random/100x100?face',
    };
    
    setUser(mockUser);
    localStorage.setItem('tribes-user', JSON.stringify(mockUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('tribes-user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}