import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;
console.log("[Debug] API Key available:", !!API_KEY); // Debug log
console.log("[Debug] Current environment:", process.env.NODE_ENV); // Debug log

// Update API URL to use the correct endpoint and model
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

export const runtime = "edge"; // Use edge runtime for better performance
export const dynamic = "force-dynamic"; // Disable caching for this route

// Helper function to clean markdown code blocks from text
function cleanMarkdownCodeBlocks(text: string): string {
  // Remove markdown code block syntax
  return text
    .replace(/```[a-zA-Z]*\n/g, "") // Remove opening code block
    .replace(/```\n?/g, "") // Remove closing code block
    .trim();
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  console.log("[Debug] Received POST request to /api/gemini"); // Debug log

  // Log all incoming headers for debugging
  const headers = Object.fromEntries(request.headers.entries());
  console.log("[Debug] Incoming request headers:", headers);

  if (!API_KEY) {
    console.error("[Debug] Missing Gemini API key in environment"); // Debug log
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { prompt } = body;

    console.log("[Debug] Received prompt:", prompt ? "yes" : "no"); // Debug log

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Get referrer information
    const referrer = request.headers.get("referer") || "http://localhost:3000";
    const origin = request.headers.get("origin") || new URL(referrer).origin;

    console.log("[Debug] Request referrer:", referrer); // Debug log
    console.log("[Debug] Request origin:", origin); // Debug log
    console.log(
      "[Debug] Making request to Gemini API URL:",
      `${API_URL}?key=${API_KEY.substring(0, 8)}...`
    ); // Debug log - only show first 8 chars of API key

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: referrer,
        Origin: origin,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    console.log("[Debug] Gemini API response status:", response.status); // Debug log

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Debug] Gemini API error:", errorText); // Debug log
      return NextResponse.json(
        { error: `API request failed: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("[Debug] Gemini API response data:", data); // Debug log

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("[Debug] Invalid response format from Gemini API:", data); // Debug log
      return NextResponse.json(
        { error: "Invalid response format from API" },
        { status: 500 }
      );
    }

    // Clean any markdown formatting from the response
    const cleanedText = cleanMarkdownCodeBlocks(
      data.candidates[0].content.parts[0].text
    );

    console.log("[Debug] Successfully processed Gemini API response"); // Debug log
    return NextResponse.json({
      text: cleanedText,
    });
  } catch (error) {
    console.error("[Debug] Error in Gemini API route:", error); // Debug log
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
