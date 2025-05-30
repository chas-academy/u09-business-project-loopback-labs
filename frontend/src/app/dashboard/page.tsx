"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import { isAuthenticated } from "@/utils/auth";
import { analyzeFeedback, FeedbackAnalysis } from "@/services/gemini";
import "@/styles/main.scss";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"input" | "insights" | "settings">(
    "input"
  );
  const [feedbackText, setFeedbackText] = useState("");
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Protect the route
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const handleAnalyze = async () => {
    if (!feedbackText.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeFeedback(feedbackText);
      setAnalysis(result);
      setActiveTab("insights");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze feedback"
      );
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
                {error && <div className="app-layout__error">{error}</div>}
                <textarea
                  className="crm-input__textarea"
                  placeholder="Paste your Swedish CRM notes here..."
                  rows={6}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
                <button
                  className="crm-input__button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Feedback"}
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "insights" && analysis && (
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
                  <ul className="app-layout__list">
                    {analysis.themes.map((theme, index) => (
                      <li key={index} className="app-layout__list-item">
                        {theme}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="app-layout__card">
                  <h2 className="app-layout__card-title">Sentiment Analysis</h2>
                  <p className="app-layout__card-subtitle">
                    Overall customer satisfaction trends
                  </p>
                  <div
                    className={`app-layout__sentiment app-layout__sentiment--${analysis.sentiment}`}
                  >
                    {analysis.sentiment.charAt(0).toUpperCase() +
                      analysis.sentiment.slice(1)}
                  </div>
                </div>

                <div className="app-layout__card">
                  <h2 className="app-layout__card-title">Action Items</h2>
                  <p className="app-layout__card-subtitle">
                    Suggested next steps based on feedback
                  </p>
                  <ul className="app-layout__list">
                    {analysis.actionItems.map((item, index) => (
                      <li key={index} className="app-layout__list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="app-layout__card">
                  <h2 className="app-layout__card-title">Summary</h2>
                  <p className="app-layout__card-subtitle">
                    Brief overview of the feedback
                  </p>
                  <p className="app-layout__summary">{analysis.summary}</p>
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
