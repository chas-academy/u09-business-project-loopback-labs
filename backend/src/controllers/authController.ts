import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Registration attempt with body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing email or password");
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    console.log("Attempting Supabase signup...");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase signup error:", error);
      res.status(400).json({ error: error.message });
      return;
    }

    console.log("Registration successful:", data);
    res.status(201).json({
      message: "Registration successful",
      user: data.user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with body:", { email, password });

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("Attempting Supabase login...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase login error:", error);
      return res.status(401).json({ error: error.message });
    }

    if (!data.user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Login successful:", {
      userId: data.user.id,
      email: data.user.email,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: data.user.id, email: data.user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    // Return the response in the expected format
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Server error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
