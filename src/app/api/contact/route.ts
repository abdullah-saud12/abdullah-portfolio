import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Wire up an email service here (e.g. Resend) when ready.
  // For now, log the submission and return success.
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ success: true });
}
