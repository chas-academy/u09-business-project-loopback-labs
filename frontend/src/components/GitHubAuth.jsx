import React from 'react';
import { useNavigate } from 'react-router-dom';

function GitHubAuth() {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

  const handleLogin = () => {
    const redirectUri = 'https://mimir1.netlify.app/auth/github/callback';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
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
