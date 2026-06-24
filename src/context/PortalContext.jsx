import { createContext, useContext, useMemo, useState } from 'react';
import { mockResults as initialResults } from '../data/mockData';

const PortalContext = createContext(null);

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export function PortalProvider({ children }) {
  const [results, setResults] = useState(initialResults);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const loginAdmin = (username, password) => {
    const isValid = username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
    setIsAdminLoggedIn(isValid);
    return isValid;
  };

  const logoutAdmin = () => setIsAdminLoggedIn(false);

  const addResult = (nextResult) => {
    setResults((current) => {
      const filtered = current.filter((item) => item.enrollmentNo !== nextResult.enrollmentNo);
      return [nextResult, ...filtered];
    });
  };

  const value = useMemo(
    () => ({
      results,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      addResult
    }),
    [results, isAdminLoggedIn]
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }

  return context;
}
