async function generateContent(prompt: string) {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: window.location.href,
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data.error); // Debug log
      throw new Error(data.error || "Failed to generate content");
    }

    return data.text;
  } catch (error) {
    console.error("Generate content error:", error); // Debug log
    throw error;
  }
}

export interface FeedbackAnalysis {
  themes: string[];
  sentiment: "positive" | "neutral" | "negative";
  actionItems: string[];
  summary: string;
}

export async function analyzeFeedback(text: string): Promise<FeedbackAnalysis> {
  try {
    const prompt = `
      Analyze the following Swedish customer feedback and provide insights.
      Please respond in JSON format with the following structure:
      {
        "themes": ["theme1", "theme2", ...],
        "sentiment": "positive/neutral/negative",
        "actionItems": ["action1", "action2", ...],
        "summary": "brief summary"
      }

      Customer Feedback:
      ${text}
    `;

    const analysisText = await generateContent(prompt);

    try {
      return JSON.parse(analysisText);
    } catch (e) {
      console.error("Failed to parse Gemini response:", e);
      throw new Error("Invalid response format from AI");
    }
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    throw error;
  }
}

export async function testGeminiConnection(): Promise<boolean> {
  try {
    const prompt =
      "Respond with 'ok' if you can process Swedish text: 'Hej världen'";
    const response = await generateContent(prompt);
    return response.toLowerCase().includes("ok");
  } catch (error) {
    console.error("Gemini connection test failed:", error);
    return false;
  }
}
