import { NextResponse } from "next/server";
import { mockAIInsights } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    insights: mockAIInsights,
    agents: [
      { name: "Review Agent", status: "active", processed: 1248 },
      { name: "Sentiment Agent", status: "active", processed: 892 },
      { name: "Recovery Agent", status: "active", processed: 47 },
      { name: "SEO Agent", status: "active", processed: 5 },
      { name: "Referral Agent", status: "active", processed: 134 },
      { name: "Executive Agent", status: "active", processed: 84 },
    ],
  });
}
