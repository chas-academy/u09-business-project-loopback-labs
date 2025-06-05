import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('githubAuthCode');
    return !!token;
  });

  // eslint-disable-next-line no-empty-pattern
  const [] = useState(null);

  const login = (code) => {
    localStorage.setItem('githubAuthCode', code);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('githubAuthCode');
    setIsLoggedIn(false);
  };

  // Check for GitHub auth code in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      // Store the code and redirect to home
      login(code);
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
