"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  Settings,
  Lightbulb,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import { isAuthenticated, signOut } from "@/utils/auth";

interface NavigationProps {
  activeTab?: "input" | "insights" | "settings";
  onTabChange?: (tab: "input" | "insights" | "settings") => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
}: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  // Show different navigation items based on the current page
  if (!isDashboard) {
    return (
      <nav className="landing-nav">
        <div className="landing-nav__container">
          <Link href="/" className="app-layout__logo">
            M<span className="app-layout__logo-accent">i</span>mir
          </Link>

          <div className="landing-nav__actions">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="landing-nav__link landing-nav__link--primary"
                >
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="landing-nav__button">
                  <LogOut size={20} />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="landing-nav__link">
                  <LogIn size={20} />
                  <span>Sign in</span>
                </Link>
                <Link
                  href="/register"
                  className="landing-nav__link landing-nav__link--primary"
                >
                  <UserPlus size={20} />
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }

  // Dashboard navigation
  return (
    <nav className="app-layout__navbar">
      <div className="app-layout__navbar-content">
        <div className="app-layout__logo-section">
          <Link href="/dashboard" className="app-layout__logo">
            M<span className="app-layout__logo-accent">i</span>mir
          </Link>

          <div className="app-layout__nav">
            <button
              onClick={() => onTabChange?.("input")}
              className={`app-layout__nav-button ${
                activeTab === "input" ? "app-layout__nav-button--active" : ""
              }`}
            >
              <MessageSquare />
              <span>Notes</span>
            </button>

            <button
              onClick={() => onTabChange?.("insights")}
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
          <button
            onClick={() => onTabChange?.("settings")}
            className={`app-layout__nav-button ${
              activeTab === "settings" ? "app-layout__nav-button--active" : ""
            }`}
          >
            <Settings />
            <span>Settings</span>
          </button>
          <button onClick={handleSignOut} className="app-layout__nav-button">
            <LogOut />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
