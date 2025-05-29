"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { loginUser, setAuthToken } from "@/utils/api";
import { useEffect, useState, Suspense } from "react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const isRegistered = searchParams?.get("registered") === "true";
    if (isRegistered) {
      setMessage(
        "Registration successful! Please check your email to verify your account before logging in."
      );
    }
  }, [searchParams]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(""); // Clear any previous errors
      console.log("Attempting login...");
      const response = await loginUser(email, password);
      console.log("Login response:", response);

      if (response.token) {
        console.log("Setting auth token...");
        setAuthToken(response.token);
        setMessage("Login successful! Redirecting to dashboard...");

        // Small delay to show the success message
        setTimeout(() => {
          console.log("Redirecting to dashboard...");
          router.push("/dashboard");
        }, 1500);
      } else {
        console.warn("No token in response:", response);
        setError("Login successful but no token received. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      {message && (
        <div className="form-success">
          <p>{message}</p>
        </div>
      )}
      {error && (
        <div className="form-error">
          <p>{error}</p>
        </div>
      )}
      <AuthForm type="login" onSubmit={handleLogin} />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
