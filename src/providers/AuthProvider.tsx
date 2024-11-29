'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AuthState } from '@/types/auth';
import { authenticate } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1];

  useEffect(() => {
    const isAuth = Cookies.get('auth') === 'true';
    setAuthState(prev => ({ ...prev, isAuthenticated: isAuth }));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const user = await authenticate(username, password);
      if (user) {
        setAuthState({ user, isAuthenticated: true });
        Cookies.set('auth', 'true', { expires: 7 });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({ user: null, isAuthenticated: false });
    Cookies.remove('auth');
    if (locale) {
      router.push(`/${locale}/login`);
    }
  }, [router, locale]);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}