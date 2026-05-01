// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on page load
    const token = localStorage.getItem('js_admin_token');
    const stored = localStorage.getItem('js_admin_info');
    if (token && stored) {
      try { setAdmin(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  function loginSuccess(token, adminInfo) {
    localStorage.setItem('js_admin_token', token);
    localStorage.setItem('js_admin_info', JSON.stringify(adminInfo));
    setAdmin(adminInfo);
  }

  function logout() {
    localStorage.removeItem('js_admin_token');
    localStorage.removeItem('js_admin_info');
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
