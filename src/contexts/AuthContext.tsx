import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Check for mock user in localStorage on component mount
  useEffect(() => {
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      try {
        setUser(JSON.parse(mockUser));
      } catch (err) {
        console.error('Error parsing mock user:', err);
        localStorage.removeItem('mockUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userType: UserType) => {
    // Create a mock user and store in localStorage
    const mockUser: User = {
      id: 'mock-user-' + Date.now(),
      name: 'Demo Doctor',
      type: userType,
      email: 'demo@hospital.com'
    };
    
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    
    // Navigate to the appropriate dashboard
    const route = userType === 'cardio'
      ? 'cardiology'
      : userType === 'neurology'
      ? 'neurology'
      : userType === 'orthopedics'
      ? 'orthopedics'
      : userType === 'ophthalmology'
      ? 'ophthalmology'
      : 'general-medicine';
    window.location.assign(`/${route}`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};