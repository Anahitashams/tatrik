import { NextResponse } from "next/server";
import { normalizePhone } from "@/lib/phone";
import { verifyStoredOtp } from "@/lib/otp-db";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const normalizedPhone = normalizePhone(body.phone);
  const code = body.code;

  const result = verifyStoredOtp(normalizedPhone, code);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
