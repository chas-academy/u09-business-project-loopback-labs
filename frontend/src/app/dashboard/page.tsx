"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import { isAuthenticated } from "@/utils/auth";
import "@/styles/main.scss";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"input" | "insights" | "settings">(
    "input"
  );

  // Protect the route
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="app-layout">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content */}
      <main className="app-layout__main">
        {activeTab === "input" && (
          <>
            <header className="app-layout__header">
              <h1 className="app-layout__header-title">CRM Notes Analysis</h1>
              <p className="app-layout__header-subtitle">
                Transform your customer feedback into actionable insights
              </p>
            </header>

            <div className="app-layout__content">
              <div className="app-layout__card">
                <h2 className="app-layout__card-title">Input Customer Notes</h2>
                <p className="app-layout__card-subtitle">
                  Paste your Swedish CRM notes below for analysis
                </p>
                <textarea
                  className="crm-input__textarea"
                  placeholder="Paste your Swedish CRM notes here..."
                  rows={6}
                />
                <button className="crm-input__button">Analyze Feedback</button>
              </div>
            </div>
          </>
        )}

        {activeTab === "insights" && (
          <>
            <header className="app-layout__header">
              <h1 className="app-layout__header-title">Feedback Insights</h1>
              <p className="app-layout__header-subtitle">
                Discover patterns and trends in your customer feedback
              </p>
            </header>

            <div className="app-layout__content">
              <div className="app-layout__content-grid">
                <div className="app-layout__card">
                  <h2 className="app-layout__card-title">Key Themes</h2>
                  <p className="app-layout__card-subtitle">
                    Most discussed topics from your feedback
                  </p>
                </div>

                <div className="app-layout__card">
                  <h2 className="app-layout__card-title">Sentiment Analysis</h2>
                  <p className="app-layout__card-subtitle">
                    Overall customer satisfaction trends
                  </p>
                </div>

                <div className="app-layout__card">
                  <h2 className="app-layout__card-title">Action Items</h2>
                  <p className="app-layout__card-subtitle">
                    Suggested next steps based on feedback
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "settings" && (
          <>
            <header className="app-layout__header">
              <h1 className="app-layout__header-title">Settings</h1>
              <p className="app-layout__header-subtitle">
                Customize your Mimir experience
              </p>
            </header>

            <div className="app-layout__content">
              {/* Add settings content here */}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
