import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItems, saveItem, deleteItem } from '../api/client';

function GithubCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Här skulle vi normalt hämta access token från GitHub
      // Men för enklare implementering, vi går tillbaka till huvudsidan
      navigate('/');
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="callback-page">
      <p>Logging in...</p>
    </div>
  );
}

export default GithubCallback;
