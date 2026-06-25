import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { mockResults as initialResults } from '../data/mockData';

const PortalContext = createContext(null);

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

function getStoredToken() {
  return localStorage.getItem('token');
}

function getStoredStudent() {
  try {
    return JSON.parse(localStorage.getItem('student') || 'null');
  } catch {
    return null;
  }
}

export function PortalProvider({ children }) {
  const [results, setResults] = useState(initialResults);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [token, setToken] = useState(getStoredToken);
  const [student, setStudent] = useState(getStoredStudent);

  const isStudentLoggedIn = !!token;

  const loginAdmin = (username, password) => {
    const isValid = username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
    setIsAdminLoggedIn(isValid);
    return isValid;
  };

  const logoutAdmin = () => setIsAdminLoggedIn(false);

  const loginStudent = useCallback((enrollmentNo, studentName) => {
    localStorage.setItem('studentLoggedIn', 'true');
    localStorage.setItem('studentName', studentName);
    localStorage.setItem('enrollmentNo', enrollmentNo);
    setToken('true');
    setStudent({ enrollmentNo, studentName });
  }, []);

  const setStudentSession = useCallback((newToken, studentData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('student', JSON.stringify(studentData));
    localStorage.setItem('studentLoggedIn', 'true');
    localStorage.setItem('studentName', studentData.studentName);
    localStorage.setItem('enrollmentNo', studentData.enrollmentNo);
    setToken(newToken);
    setStudent(studentData);
  }, []);

  const logoutStudent = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('studentName');
    localStorage.removeItem('enrollmentNo');
    setToken(null);
    setStudent(null);
  }, []);

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
      isStudentLoggedIn,
      token,
      student,
      loginAdmin,
      logoutAdmin,
      loginStudent,
      setStudentSession,
      logoutStudent,
      addResult
    }),
    [results, isAdminLoggedIn, isStudentLoggedIn, token, student]
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
