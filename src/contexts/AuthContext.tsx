import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type UserType = 'cardio' | 'generic' | 'neurology' | 'orthopedics';

interface User {
  id: string;
  name: string;
  type: UserType;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userType: UserType) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const sUser = session.user;
        const baseUser: User = {
          id: sUser.id,
          name: (sUser.user_metadata?.full_name as string) || (sUser.email?.split("@")[0] ?? "Clinician"),
          type: 'generic',
          email: sUser.email ?? ''
        };
        setUser(baseUser);

        // Defer Supabase calls to avoid deadlocks
        setTimeout(async () => {
          const { data, error } = await supabase
            .from('doctors')
            .select('specialty')
            .eq('id', sUser.id)
            .maybeSingle();
          if (!error && data?.specialty) {
            const spec = data.specialty as string;
            const mapped: UserType = spec === 'cardiology' ? 'cardio' : spec === 'neurology' ? 'neurology' : spec === 'general_medicine' ? 'generic' : 'generic';
            setUser(prev => prev ? { ...prev, type: mapped } : prev);
          }
        }, 0);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const sUser = session.user;
        const baseUser: User = {
          id: sUser.id,
          name: (sUser.user_metadata?.full_name as string) || (sUser.email?.split("@")[0] ?? "Clinician"),
          type: 'generic',
          email: sUser.email ?? ''
        };
        setUser(baseUser);

        setTimeout(async () => {
          const { data, error } = await supabase
            .from('doctors')
            .select('specialty')
            .eq('id', sUser.id)
            .maybeSingle();
          if (!error && data?.specialty) {
            const spec = data.specialty as string;
            const mapped: UserType = spec === 'cardiology' ? 'cardio' : spec === 'neurology' ? 'neurology' : spec === 'general_medicine' ? 'generic' : 'generic';
            setUser(prev => prev ? { ...prev, type: mapped } : prev);
          }
        }, 0);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = (userType: UserType) => {
    const route = userType === 'cardio' ? 'cardiology' : userType === 'neurology' ? 'neurology' : userType === 'orthopedics' ? 'orthopedics' : 'general-medicine';
    window.location.assign(`/login/${route}`);
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};