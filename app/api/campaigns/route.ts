import { NextResponse } from "next/server";
import { mockCampaigns } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    campaigns: mockCampaigns,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, trigger, channel, targetSegment } = body;

    const newCampaign = {
      id: `camp_${Date.now()}`,
      name: name || "New Automation Campaign",
      type: type || "review_request",
      status: "paused",
      trigger: trigger || "24h after appointment",
      channel: channel || ["sms", "email"],
      sent: 0,
      opened: 0,
      converted: 0,
      conversionRate: 0.0,
      targetSegment: targetSegment || "all_patients",
      locations: ["all"],
      createdAt: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({
      success: true,
      campaign: newCampaign,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid campaign payload" }, { status: 400 });
  }
}
