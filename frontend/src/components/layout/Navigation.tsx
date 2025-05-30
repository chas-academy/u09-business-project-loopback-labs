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
  Menu,
  X,
  ChevronDown,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Show different navigation items based on the current page
  if (!isDashboard) {
    return (
      <nav className="landing-nav">
        <div className="landing-nav__container">
          <div className="landing-nav__left">
            <Link href="/" className="landing-nav__logo">
              M<span className="landing-nav__logo-accent">i</span>mir
            </Link>

            <div className="landing-nav__links">
              <div
                className="landing-nav__dropdown"
                onMouseEnter={() => setIsProductDropdownOpen(true)}
                onMouseLeave={() => setIsProductDropdownOpen(false)}
              >
                <button className="landing-nav__dropdown-trigger">
                  Product
                  <ChevronDown size={16} />
                </button>
                {isProductDropdownOpen && (
                  <div className="landing-nav__dropdown-content">
                    <div className="landing-nav__dropdown-section">
                      <h3 className="landing-nav__dropdown-title">Features</h3>
                      <Link
                        href="#features"
                        className="landing-nav__dropdown-link"
                      >
                        <MessageSquare size={16} />
                        <div>
                          <span>AI Analysis</span>
                          <span>Process customer feedback with AI</span>
                        </div>
                      </Link>
                      <Link
                        href="#features"
                        className="landing-nav__dropdown-link"
                      >
                        <Lightbulb size={16} />
                        <div>
                          <span>Smart Insights</span>
                          <span>Get actionable recommendations</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link href="#pricing" className="landing-nav__link">
                Pricing
              </Link>
              <Link href="#about" className="landing-nav__link">
                About
              </Link>
            </div>
          </div>

          <div className="landing-nav__right">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="landing-nav__button landing-nav__button--primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="landing-nav__button landing-nav__button--secondary"
                >
                  <LogOut size={20} />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="landing-nav__button landing-nav__button--secondary"
                >
                  <LogIn size={20} />
                  <span>Sign in</span>
                </Link>
                <Link
                  href="/register"
                  className="landing-nav__button landing-nav__button--primary"
                >
                  <UserPlus size={20} />
                  <span>Get Started</span>
                </Link>
              </>
            )}

            <button
              className="landing-nav__mobile-trigger"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="landing-nav__mobile-menu">
            <Link href="#features" className="landing-nav__mobile-link">
              Product
            </Link>
            <Link href="#pricing" className="landing-nav__mobile-link">
              Pricing
            </Link>
            <Link href="#about" className="landing-nav__mobile-link">
              About
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="landing-nav__mobile-link">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="landing-nav__mobile-link landing-nav__mobile-link--button"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="landing-nav__mobile-link">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="landing-nav__mobile-link landing-nav__mobile-link--cta"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
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
