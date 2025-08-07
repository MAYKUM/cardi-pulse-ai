import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserType = 'cardio' | 'generic' | 'neurology';

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
      id: userType === 'cardio' ? 'cardio-001' : userType === 'neurology' ? 'neuro-001' : 'generic-001',
      name: userType === 'cardio' ? 'Dr. Cardio' : userType === 'neurology' ? 'Dr. Neurologist' : 'Dr. Generic',
      type: userType,
      email: userType === 'cardio' ? 'cardio@hospital.com' : userType === 'neurology' ? 'neuro@hospital.com' : 'generic@hospital.com'
    };
    
    setUser(userData);
    localStorage.setItem('medical_app_user', JSON.stringify(userData));
    
    // Navigate to specialty-specific route
    const route = userType === 'cardio' ? '/cardiology' : 
                  userType === 'neurology' ? '/neurology' : 
                  '/general-medicine';
    window.location.href = route;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medical_app_user');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};