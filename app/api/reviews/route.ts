import { NextResponse } from "next/server";
import { mockReviews, mockPatients } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    reviews: mockReviews,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, clinicId, platform, rating, content, authorName } = body;

    // Simulate smart review routing logic
    const patient = mockPatients.find((p) => p.id === patientId);
    let routingResult = "google_review";

    if (patient) {
      if (patient.satisfactionScore < 60) {
        routingResult = "private_feedback_form";
      } else if (platform) {
        routingResult = `${platform.toLowerCase()}_review`;
      }
    }

    const newReview = {
      id: `rev_${Date.now()}`,
      patient: authorName || patient?.name || "Anonymous",
      platform: platform || "google",
      rating: rating || 5,
      content: content || "",
      date: new Date().toISOString().split("T")[0],
      responded: false,
      aiResponse: "Thank you for sharing your feedback with us.",
      sentiment: rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative",
      location: clinicId || "Main Street Medical Center",
      routingResult,
    };

    return NextResponse.json({
      success: true,
      review: newReview,
      routedTo: routingResult,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid review request payload" },
      { status: 400 }
    );
  }
}
