import { NextResponse } from "next/server";
import { normalizePhone, isValidIranianPhone } from "@/lib/phone";
import { canResend, createOtp } from "@/lib/otp-db";
import { isKavenegarConfigured, sendSms, buildOtpMessage } from "@/lib/kavenegar";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const normalizedPhone = normalizePhone(body.phone);

  if (!isValidIranianPhone(normalizedPhone)) {
    return NextResponse.json({ error: "شماره تماس معتبر نیست؛ مثال: 09123456789" }, { status: 400 });
  }

  const resend = canResend(normalizedPhone);
  if (!resend.ok) {
    return NextResponse.json(
      { error: "لطفاً کمی صبر کنید و دوباره تلاش کنید.", retryAfterMs: resend.retryAfterMs },
      { status: 429 }
    );
  }

  const { code, expiresAt, canResendAt } = createOtp(normalizedPhone);

  if (!isKavenegarConfigured()) {
    // No KAVENEGAR_API_KEY set yet - fall back to handing the code back to
    // the caller so the UI can show it as a "test code" hint, instead of
    // silently failing. Once the env var is set, this branch stops firing
    // and the code only ever goes out as a real text message.
    return NextResponse.json({ ok: true, sent: false, devCode: code, expiresAt, canResendAt });
  }

  try {
    await sendSms(normalizedPhone, buildOtpMessage(code));
  } catch (error) {
    return NextResponse.json({ error: error.message || "ارسال پیامک ناموفق بود." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, sent: true, devCode: null, expiresAt, canResendAt });
}
