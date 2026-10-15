import fs from "fs";
import path from "path";

// Server-side OTP ("one-time password") store, backed by a JSON file on
// disk - the same pattern as lib/products-db.js. A code now actually gets
// texted (see app/api/otp/request/route.js), so it has to be checked on the
// server: a code kept in the browser's localStorage could be read out of
// dev tools and used to "verify" without ever receiving the SMS.
//
// Like products-db.js, this is still not a real database - no concurrent-
// write safety, and most PaaS platforms wipe the filesystem on redeploy
// unless a persistent disk is attached. Swap it for Redis/a real DB with a
// TTL when you're ready; the API routes that call it won't need to change
// shape.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "otp.json");

const CODE_TTL_MS = 2 * 60 * 1000; // a code is valid for 2 minutes
const RESEND_COOLDOWN_MS = 45 * 1000; // 45s between resends for the same number

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "{}", "utf-8");
  }
}

function readStore() {
  try {
    ensureFile();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function writeStore(store) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// { ok: true } or { ok: false, retryAfterMs } - call before createOtp() to
// enforce the resend cooldown.
export function canResend(phone) {
  const store = readStore();
  const entry = store[phone];
  const now = Date.now();
  if (entry && entry.canResendAt > now) {
    return { ok: false, retryAfterMs: entry.canResendAt - now };
  }
  return { ok: true };
}

// Creates (or replaces) the pending code for `phone`.
// Returns { code, expiresAt, canResendAt }.
export function createOtp(phone) {
  const store = readStore();
  const now = Date.now();
  const entry = {
    code: generateCode(),
    expiresAt: now + CODE_TTL_MS,
    canResendAt: now + RESEND_COOLDOWN_MS,
  };
  store[phone] = entry;
  writeStore(store);
  return entry;
}

// Checks `code` against the one stored for `phone`.
// Returns { ok: true } or { ok: false, error }.
export function verifyStoredOtp(phone, code) {
  const store = readStore();
  const entry = store[phone];

  if (!entry) {
    return { ok: false, error: "ابتدا کد را برای این شماره درخواست کنید." };
  }
  if (Date.now() > entry.expiresAt) {
    delete store[phone];
    writeStore(store);
    return { ok: false, error: "کد منقضی شده است؛ دوباره درخواست دهید." };
  }
  if (entry.code !== String(code || "").trim()) {
    return { ok: false, error: "کد وارد شده صحیح نیست." };
  }

  delete store[phone];
  writeStore(store);
  return { ok: true };
}
