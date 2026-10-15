// Minimal Kavenegar SMS client (no SDK dependency - just their plain REST
// API over fetch). Docs: https://kavenegar.com/rest.html
//
// Needs KAVENEGAR_API_KEY in your environment (.env.local). Optionally set
// KAVENEGAR_SENDER to a specific sender line number from your Kavenegar
// panel; if you leave it out, Kavenegar uses your account's default line.
const KAVENEGAR_API_KEY = process.env.KAVENEGAR_API_KEY;
const KAVENEGAR_SENDER = process.env.KAVENEGAR_SENDER;

export function isKavenegarConfigured() {
  return Boolean(KAVENEGAR_API_KEY);
}

// Sends `message` to `phone` (already-normalized "09XXXXXXXXX").
// Throws with a Persian-friendly message on failure.
export async function sendSms(phone, message) {
  if (!KAVENEGAR_API_KEY) {
    throw new Error("سرویس پیامک پیکربندی نشده است.");
  }

  const params = new URLSearchParams({ receptor: phone, message });
  if (KAVENEGAR_SENDER) params.set("sender", KAVENEGAR_SENDER);

  const url = `https://api.kavenegar.com/v1/${KAVENEGAR_API_KEY}/sms/send.json?${params.toString()}`;

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error("اتصال به سرویس پیامک برقرار نشد.");
  }

  const data = await response.json().catch(() => null);
  const status = data?.return?.status;

  if (!response.ok || status !== 200) {
    // Kavenegar's own error text (in Persian) when available, e.g. invalid
    // API key, insufficient credit, invalid sender line, etc.
    throw new Error(data?.return?.message || "ارسال پیامک با خطا مواجه شد.");
  }

  return data;
}

export function buildOtpMessage(code) {
  return `کد تایید شما در فروشگاه خاک: ${code}\nاین کد تا ۲ دقیقه معتبر است.`;
}
