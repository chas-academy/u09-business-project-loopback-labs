import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GithubCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      // Get the code from URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        // In a real app, we would exchange this code for an access token
        // For now, we'll just use the code as a token
        await login(code);
        navigate("/recipes");
      } else {
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate, login]);

  return (
    <div className="callback-page">
      <p>Logging in...</p>
    </div>
  );
}

export default GithubCallback;
