import { useState } from "react";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string) => Promise<void>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // Prevent double submission
    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onSubmit(email, password);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="form-error">
          <p>{error}</p>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email-address">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={type === "login" ? "current-password" : "new-password"}
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          minLength={6}
        />
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={loading || !email || !password}
      >
        {loading && (
          <svg
            className="loading-spinner"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {type === "login"
          ? loading
            ? "Signing in..."
            : "Sign in"
          : loading
          ? "Registering..."
          : "Register"}
      </button>

      <div className="form-footer">
        {type === "login" ? (
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register">Register here</Link>
          </p>
        ) : (
          <p>
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        )}
      </div>
    </form>
  );
}
