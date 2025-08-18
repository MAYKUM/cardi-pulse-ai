import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type UserType = 'cardio' | 'generic' | 'neurology' | 'orthopedics' | 'ophthalmology';

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

  const loadUserWithSpecialty = async (sUser: any) => {
    const baseUser: User = {
      id: sUser.id,
      name: (sUser.user_metadata?.full_name as string) || (sUser.email?.split("@")[0] ?? "Clinician"),
      type: 'generic',
      email: sUser.email ?? ''
    };
    
    // Set base user first
    setUser(baseUser);
    
    // Then fetch specialty
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('specialty')
        .eq('id', sUser.id)
        .maybeSingle();
        
      if (!error && data?.specialty) {
        const spec = data.specialty as string;
        const mapped: UserType =
          spec === 'cardiology' ? 'cardio' :
          spec === 'neurology' ? 'neurology' :
          spec === 'ophthalmology' ? 'ophthalmology' :
          spec === 'orthopedics' ? 'orthopedics' :
          spec === 'general_medicine' ? 'generic' : 'generic';
        setUser(prev => prev ? { ...prev, type: mapped } : prev);
      }
    } catch (err) {
      console.error('Error fetching user specialty:', err);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Use setTimeout to avoid deadlocks but with a shorter delay to improve UX
        setTimeout(() => {
          loadUserWithSpecialty(session.user);
        }, 10);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setTimeout(() => {
          loadUserWithSpecialty(session.user);
        }, 10);
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
    const route = userType === 'cardio'
      ? 'cardiology'
      : userType === 'neurology'
      ? 'neurology'
      : userType === 'orthopedics'
      ? 'orthopedics'
      : userType === 'ophthalmology'
      ? 'ophthalmology'
      : 'general-medicine';
    window.location.assign(`/login/${route}`);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};