"use client";

// Carries the "dev mode" test code (shown only when Kavenegar isn't
// configured yet) and the resend-cooldown timestamp from the /login page
// to the /verify page, via sessionStorage - a normal client-side route
// change keeps sessionStorage, so this survives the router.push() between
// the two pages without needing a server round trip just to read it back.
const HINT_KEY = "tatrik-otp-hint-v1";

export function readOtpHint(phone) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(HINT_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && parsed.phone === phone ? parsed : null;
  } catch (error) {
    return null;
  }
}

export function writeOtpHint(phone, { code = null, canResendAt = 0 } = {}) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(HINT_KEY, JSON.stringify({ phone, code, canResendAt }));
  } catch (error) {
    // ignore
  }
}
