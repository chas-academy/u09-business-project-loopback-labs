"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestConnection() {
  const [authStatus, setAuthStatus] = useState<string>("Checking auth...");
  const [dbStatus, setDbStatus] = useState<string>("Checking DB...");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpStatus, setSignUpStatus] = useState("");

  useEffect(() => {
    async function checkConnection() {
      // Test authentication
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();
      if (authError) {
        setAuthStatus(`Auth Error: ${authError.message}`);
      } else {
        setAuthStatus(session ? "Authenticated" : "Not authenticated");
      }

      // Test database connection with a simpler query
      const { error: dbError } = await supabase
        .from("notes")
        .select("*")
        .limit(0);

      if (dbError) {
        setDbStatus(`DB Error: ${dbError.message}`);
        console.error("Database error details:", dbError);
      } else {
        setDbStatus("Database connection successful! Notes table exists.");
      }
    }

    checkConnection();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpStatus("Signing up...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign up error:", error);
      setSignUpStatus(`Error: ${error.message}`);
    } else {
      setSignUpStatus("Success! Check your email for the confirmation link.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded">
          <h2 className="font-semibold">Authentication Status:</h2>
          <p>{authStatus}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h2 className="font-semibold">Database Connection Status:</h2>
          <p>{dbStatus}</p>
        </div>

        {authStatus === "Not authenticated" && (
          <form
            onSubmit={handleSignUp}
            className="space-y-4 bg-gray-50 p-4 rounded"
          >
            <h2 className="font-semibold">Sign Up for Testing</h2>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign Up
            </button>

            {signUpStatus && (
              <p
                className={`mt-2 text-sm ${
                  signUpStatus.startsWith("Error")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {signUpStatus}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
