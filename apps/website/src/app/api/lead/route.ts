import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  vertical?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadPayload;

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // The legacy contact form is not yet connected to durable storage. Do not
    // log its PII while the tool-specific Convex ingestion path is rolled out.
    console.info("[lead] contact form validated", {
      vertical: typeof body.vertical === "string" ? body.vertical : "unknown",
      receivedAt: new Date().toISOString(),
      hasCompany: Boolean(body.company),
      hasMessage: Boolean(body.message),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] error:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
