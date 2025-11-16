import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserData {
  _id: string;
  nombreCompleto: string;
  correo: string;
  rol: string;
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') { // Extra check to avoid bad data
          setUser(parsedUser);
          setToken(storedToken);
        } else {
          console.warn('Invalid user data in localStorage - clearing');
          logout(); // Clear bad data
        }
      } catch (err) {
        console.error('Failed to parse user from localStorage:', err);
        logout(); // Clear on error to prevent crash loop
      }
    }
  }, []);

  const login = (newToken: string, userData: UserData) => {
    if (!userData || typeof userData !== 'object') {
      console.error('Invalid userData in login - skipping save');
      return;
    }
    setUser(userData);
    setToken(newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};