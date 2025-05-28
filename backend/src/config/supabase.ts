import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is not set in environment variables");
}

if (!supabaseAnonKey) {
  throw new Error("SUPABASE_ANON_KEY is not set in environment variables");
}

// Create the Supabase client with explicit options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Test the connection without async
console.log("Initializing Supabase client with URL:", supabaseUrl);

// Optional: Test connection
supabase.auth
  .getUser()
  .then(({ data, error }) => {
    if (error) {
      console.error("Supabase connection test failed:", error.message);
    } else {
      console.log("Supabase connection test successful");
    }
  })
  .catch((err) => {
    console.error("Failed to test Supabase connection:", err.message);
  });
