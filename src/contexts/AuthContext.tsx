import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('medical_app_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userType: UserType) => {
    const userData: User = {
      id: userType === 'cardio' ? 'cardio-001' : 
          userType === 'neurology' ? 'neuro-001' : 
          userType === 'orthopedics' ? 'ortho-001' : 'generic-001',
      name: userType === 'cardio' ? 'Dr. Cardio' : 
            userType === 'neurology' ? 'Dr. Neurologist' : 
            userType === 'orthopedics' ? 'Dr. Orthopedic' : 'Dr. Generic',
      type: userType,
      email: userType === 'cardio' ? 'cardio@hospital.com' : 
             userType === 'neurology' ? 'neuro@hospital.com' : 
             userType === 'orthopedics' ? 'ortho@hospital.com' : 'generic@hospital.com'
    };
    
    setUser(userData);
    localStorage.setItem('medical_app_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medical_app_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};