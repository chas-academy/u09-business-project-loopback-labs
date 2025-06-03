import React from 'react';
import { useNavigate } from 'react-router-dom';

function GitHubAuth() {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

  // Get current environment
  const isProduction = window.location.hostname === 'mimir1.netlify.app';
  const redirectUri = isProduction 
    ? 'https://mimir1.netlify.app/auth/github/callback' 
    : 'http://localhost:5173/auth/github/callback';

  const handleLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const isProduction = window.location.hostname === 'mimir1.netlify.app';
    const redirectUri = isProduction 
      ? 'https://mimir1.netlify.app/auth/github/callback'
      : 'http://localhost:5173/auth/github/callback';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=public_repo`;
    window.location.href = authUrl;
  };

  return (
    <button 
      onClick={handleLogin}
      className="github-login-button"
    >
      Login with GitHub
    </button>
  );
}

export default GitHubAuth;
