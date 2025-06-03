import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const isProduction = window.location.hostname === 'mimir1.netlify.app';
    const redirectUri = isProduction 
      ? 'https://mimir1.netlify.app/auth/github/callback'
      : 'http://localhost:5173/auth/github/callback';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="login-container">
      <h2>Welcome to Mimir App</h2>
      <div className="login-form">
        <p>Please log in with your GitHub account to continue.</p>
        <button onClick={handleLogin} className="login-button">
          Login with GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;
