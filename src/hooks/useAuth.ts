import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = sessionStorage.getItem('raven_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const setAuth = (token: string) => {
    sessionStorage.setItem('raven_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('raven_token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return { isAuthenticated, loading, setAuth, logout };
}
