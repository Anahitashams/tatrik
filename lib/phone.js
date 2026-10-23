// Shared phone helpers - used by both the client (auth-context.jsx) and the
// server-side OTP API routes, so the exact same validation/normalization
// runs on both sides.

// Accepts "09123456789", "+989123456789" or "00989123456789" (with or
// without spaces/dashes) and normalizes all of them to "09123456789".
export function normalizePhone(value) {
  let digits = (value || "").replace(/[^\d]/g, "");
  if (digits.startsWith("0098")) digits = digits.slice(4);
  else if (digits.startsWith("98")) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith("9")) digits = `0${digits}`;
  return digits;
}

export function isValidIranianPhone(value) {
  return /^09\d{9}$/.test(normalizePhone(value));
}

// Used on the phone <input>'s onChange across the site so you physically
// cannot type a 12th digit or a letter into it - strips anything that
// isn't a digit and caps the result at 11 characters (the length of a
// normalized "09XXXXXXXXX" number).
export function sanitizePhoneInput(value) {
  return (value || "").replace(/[^\d]/g, "").slice(0, 11);
}
