"use client";

import { useState } from "react";
import { BarChart3, MessageSquare, Settings } from "lucide-react";
import "@/styles/main.scss";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"input" | "insights" | "settings">(
    "input"
  );

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <nav className="app-layout__sidebar">
        <div className="app-layout__logo">M</div>
        <button
          onClick={() => setActiveTab("input")}
          className={`app-layout__nav-button ${
            activeTab === "input" ? "app-layout__nav-button--active" : ""
          }`}
        >
          <MessageSquare size={24} />
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={`app-layout__nav-button ${
            activeTab === "insights" ? "app-layout__nav-button--active" : ""
          }`}
        >
          <BarChart3 size={24} />
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`app-layout__nav-button ${
            activeTab === "settings" ? "app-layout__nav-button--active" : ""
          }`}
        >
          <Settings size={24} />
        </button>
      </nav>

      {/* Main content */}
      <div className="app-layout__main">
        {activeTab === "input" && (
          <div className="app-layout__content">
            <h1 className="app-layout__content-title">Input CRM Notes</h1>
            <div className="crm-input">
              <textarea
                className="crm-input__textarea"
                placeholder="Paste your Swedish CRM notes here..."
              />
              <button className="crm-input__button">Analyze Feedback</button>
            </div>
          </div>
        )}

        {activeTab === "insights" && (
          <div className="app-layout__content">
            <h1 className="app-layout__content-title">Feedback Insights</h1>
            <div className="app-layout__content-card">
              <p>Insights dashboard coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="app-layout__content">
            <h1 className="app-layout__content-title">Settings</h1>
            <div className="app-layout__content-card">
              <p>Settings panel coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
