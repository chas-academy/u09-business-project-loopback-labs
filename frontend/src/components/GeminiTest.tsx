import { useState } from "react";
import {
  testGeminiConnection,
  analyzeFeedback,
  type FeedbackAnalysis,
} from "@/services/gemini";

export default function GeminiTest() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [testFeedback, setTestFeedback] = useState<string>("");
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await testGeminiConnection();
      setIsConnected(result);
    } catch (error: unknown) {
      console.error("Connection test error:", error);
      setError("Failed to test connection");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeText = async () => {
    if (!testFeedback.trim()) {
      setError("Please enter some feedback text");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeFeedback(testFeedback);
      setAnalysis(result);
    } catch (error: unknown) {
      console.error("Analysis error:", error);
      setError("Failed to analyze feedback");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout__card">
      <h2 className="app-layout__card-title">Gemini API Test</h2>

      <div className="gemini-test">
        <button
          onClick={testConnection}
          className="crm-input__button"
          disabled={isLoading}
        >
          Test Connection
        </button>

        {isConnected !== null && (
          <p
            className={`gemini-test__status ${
              isConnected
                ? "gemini-test__status--success"
                : "gemini-test__status--error"
            }`}
          >
            {isConnected ? "Connected successfully!" : "Connection failed"}
          </p>
        )}

        <div className="gemini-test__analysis">
          <textarea
            className="crm-input__textarea"
            value={testFeedback}
            onChange={(e) => setTestFeedback(e.target.value)}
            placeholder="Enter Swedish feedback text to test..."
            rows={4}
          />

          <button
            onClick={analyzeText}
            className="crm-input__button"
            disabled={isLoading || !testFeedback.trim()}
          >
            Analyze Text
          </button>

          {isLoading && <p>Loading...</p>}

          {error && <p className="gemini-test__error">{error}</p>}

          {analysis && (
            <div className="gemini-test__results">
              <h3>Analysis Results:</h3>
              <div className="gemini-test__result-item">
                <h4>Themes:</h4>
                <ul>
                  {analysis.themes.map((theme, index) => (
                    <li key={index}>{theme}</li>
                  ))}
                </ul>
              </div>

              <div className="gemini-test__result-item">
                <h4>Sentiment:</h4>
                <p>{analysis.sentiment}</p>
              </div>

              <div className="gemini-test__result-item">
                <h4>Action Items:</h4>
                <ul>
                  {analysis.actionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="gemini-test__result-item">
                <h4>Summary:</h4>
                <p>{analysis.summary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
