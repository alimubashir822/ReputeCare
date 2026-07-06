import { NextResponse } from "next/server";
import { mockDashboardKPIs, mockReviewTrendData, mockSentimentData, mockRecentActivity } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    kpis: mockDashboardKPIs,
    reviewTrends: mockReviewTrendData,
    sentiment: mockSentimentData,
    recentActivity: mockRecentActivity,
  });
}
