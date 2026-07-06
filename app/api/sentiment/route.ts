import { NextResponse } from "next/server";
import { mockSentimentTrend, mockVoiceThemes, mockPatients } from "@/lib/mock-data";

export async function GET() {
  const atRisk = mockPatients.filter(
    (p) => p.sentiment === "negative" || p.sentiment === "very_negative"
  );

  return NextResponse.json({
    trend: mockSentimentTrend,
    voiceThemes: mockVoiceThemes,
    atRiskPatients: atRisk,
    distribution: [
      { label: "Very Positive", value: 52 },
      { label: "Positive", value: 28 },
      { label: "Neutral", value: 12 },
      { label: "Negative", value: 6 },
      { label: "Very Negative", value: 2 },
    ],
  });
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    // Simulate simple keyword sentiment detection
    const lowerText = (text || "").toLowerCase();
    let sentiment = "neutral";
    let confidence = 75;
    let score = 50;

    if (lowerText.includes("great") || lowerText.includes("excellent") || lowerText.includes("best") || lowerText.includes("amazing")) {
      sentiment = "very_positive";
      confidence = 96;
      score = 95;
    } else if (lowerText.includes("good") || lowerText.includes("nice") || lowerText.includes("friendly")) {
      sentiment = "positive";
      confidence = 88;
      score = 80;
    } else if (lowerText.includes("wait") || lowerText.includes("late") || lowerText.includes("delay") || lowerText.includes("billing")) {
      sentiment = "negative";
      confidence = 92;
      score = 30;
    } else if (lowerText.includes("bad") || lowerText.includes("worst") || lowerText.includes("horrible") || lowerText.includes("rude")) {
      sentiment = "very_negative";
      confidence = 98;
      score = 15;
    }

    return NextResponse.json({
      success: true,
      sentiment,
      confidence,
      score,
      action: score < 40 ? "route_private_feedback" : "request_public_review",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid text" }, { status: 400 });
  }
}
