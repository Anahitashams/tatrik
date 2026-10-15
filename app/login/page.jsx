"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthShell from "@/components/AuthShell";
import { useAuth } from "@/lib/auth-context";
import { writeOtpHint } from "@/lib/otp-hint";

const inputClass =
  "w-full rounded-2xl border border-ink/15 bg-cream px-5 py-4 text-base text-ink placeholder:text-ink-soft/50 transition-colors focus:border-sky-dark focus:outline-none focus:ring-4 focus:ring-sky/15";

export default function LoginPage() {
  const { user, hydrated, requestLoginOtp } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && user) {
      router.replace(user.role === "admin" ? "/dashboard" : "/account");
    }
  }, [hydrated, user, router]);

  if (!hydrated || user) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const result = await requestLoginOtp(phone);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    writeOtpHint(result.phone, { code: result.devCode, canResendAt: result.canResendAt });
    router.push(`/verify?phone=${encodeURIComponent(result.phone)}`);
  }

  return (
    <main>
      <Navbar />
      <AuthShell>
        <span className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-4 py-1.5 text-xs text-sky-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-dark" />
          بدون رمز عبور
        </span>

        <h1 className="mt-5 font-display text-4xl leading-tight text-ink md:text-5xl">
          ورود یا ساخت حساب
        </h1>
        <p className="mt-4 max-w-sm text-base leading-7 text-ink-soft">
          شماره تماستان را وارد کنید تا کد تأیید برایتان پیامک شود. اگر حساب نداشته باشید،
          همین‌جا برایتان ساخته می‌شود.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-ink-soft">شماره تماس</label>
            <input
              type="tel"
              dir="ltr"
              required
              autoFocus
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={`${inputClass} text-center tracking-widest`}
              placeholder="09123456789"
            />
          </div>

          {error && <p className="text-sm text-clay-dark">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base">
            {loading ? "در حال ارسال کد…" : "دریافت کد تأیید"}
          </button>
        </form>
      </AuthShell>
      <Footer />
    </main>
  );
}
