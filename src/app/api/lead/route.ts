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

    const lead = {
      name: body.name,
      email: body.email,
      company: body.company ?? "",
      message: body.message ?? "",
      vertical: body.vertical ?? "unknown",
      receivedAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") ?? "",
      referer: req.headers.get("referer") ?? "",
    };

    console.log("[lead] received:", JSON.stringify(lead));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] error:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
