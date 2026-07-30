import { NextResponse } from "next/server";

const DEFAULT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzX-_VVJCDrktCjp0Pyrs3-ktr-HoHXmOM3ZvTU2Rw_mupUD1JstASZ-n_hG0Lsqif6/exec";

// Next.js API route for handling Contact Form submissions and posting to Google Sheets
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, type, message } = body;

    const webhookUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL ||
      DEFAULT_WEBHOOK_URL;

    const payload = {
      timestamp: new Date().toISOString(),
      name: name || "",
      email: email || "",
      phone: phone || "",
      inquiryType: type || "general",
      message: message || "",
    };

    // Post to Google Apps Script / Sheet Webhook
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ success: true, message: "Form submitted to Google Sheet" });
  } catch (error) {
    console.error("Error submitting contact form to Google Sheet:", error);
    return NextResponse.json({ success: false, error: "Failed to submit message" }, { status: 500 });
  }
}
