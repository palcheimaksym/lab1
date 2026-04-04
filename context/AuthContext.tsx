import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('userToken');
      setToken(savedToken);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (userToken: string) => {
    setToken(userToken);
    await AsyncStorage.setItem('userToken', userToken);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};