"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Settings,
  Lightbulb,
  LogIn,
  LogOut,
} from "lucide-react";
import { isAuthenticated, signOut } from "@/utils/auth";

interface NavigationProps {
  activeTab: "input" | "insights" | "settings";
  onTabChange: (tab: "input" | "insights" | "settings") => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
}: NavigationProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  return (
    <nav className="app-layout__navbar">
      <div className="app-layout__navbar-content">
        <div className="app-layout__logo-section">
          <Link href="/" className="app-layout__logo">
            M<span className="app-layout__logo-accent">i</span>mir
          </Link>

          <div className="app-layout__nav">
            <button
              onClick={() => onTabChange("input")}
              className={`app-layout__nav-button ${
                activeTab === "input" ? "app-layout__nav-button--active" : ""
              }`}
            >
              <MessageSquare />
              <span>Notes</span>
            </button>

            <button
              onClick={() => onTabChange("insights")}
              className={`app-layout__nav-button ${
                activeTab === "insights" ? "app-layout__nav-button--active" : ""
              }`}
            >
              <Lightbulb />
              <span>Insights</span>
            </button>
          </div>
        </div>

        <div className="app-layout__nav-right">
          {isLoggedIn ? (
            <>
              <button onClick={signOut} className="app-layout__nav-button">
                <LogOut />
                <span>Sign out</span>
              </button>
              <button
                onClick={() => onTabChange("settings")}
                className={`app-layout__nav-button ${
                  activeTab === "settings"
                    ? "app-layout__nav-button--active"
                    : ""
                }`}
              >
                <Settings />
                <span>Settings</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="app-layout__nav-button">
                <LogIn />
                <span>Sign in</span>
              </Link>
              <Link href="/register" className="app-layout__nav-button">
                <LogIn />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
