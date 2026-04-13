import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Map payload explicitly
    const structuredRow = {
      leadType: data.leadType || "Unknown",
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      message: data.message || "",
      interestedCollege: data.interestedCollege || "",
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL is missing! Logging lead to console: ", structuredRow);
      return NextResponse.json({ success: true, message: "Lead captured (Dev Mode - Webhook missing)" });
    }

    // Send to Google Sheets Apps Script Webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(structuredRow),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with ${response.status}`);
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully" });
  } catch (error: any) {
    console.error("Failed to process lead:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit lead" },
      { status: 500 }
    );
  }
}
