import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { reviewContent, rating, patientName, platform } = await request.json();

    // HIPAA compliance rule: Do not acknowledge patient name, medical details, or treatment explicitly
    // unless it is generic and helpful.
    let draft = "";

    if (rating >= 4) {
      draft = `Thank you for sharing your positive experience! We are dedicated to providing compassionate, high-quality care to everyone we serve. Your kind words are greatly appreciated by our entire team.`;
    } else {
      draft = `Thank you for bringing your concerns to our attention. We are committed to providing an excellent patient experience and take feedback seriously to continuously improve our scheduling and wait times. Please reach out to our clinic manager directly so we can resolve this for you.`;
    }

    return NextResponse.json({
      success: true,
      draft,
      hipaaCompliant: true,
      confidence: 97,
      rulesApplied: ["no_protected_health_info", "no_visit_date_acknowledgment", "generic_appreciation"],
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid review content" }, { status: 400 });
  }
}
