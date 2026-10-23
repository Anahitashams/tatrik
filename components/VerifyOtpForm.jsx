"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { readOtpHint, writeOtpHint } from "@/lib/otp-hint";

const CODE_LENGTH = 6;

const inputClass =
  "w-full rounded-2xl border border-ink/15 bg-cream px-5 py-4 text-base text-ink placeholder:text-ink-soft/50 transition-colors focus:border-sky-dark focus:outline-none focus:ring-4 focus:ring-sky/15";

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const { verifyLoginOtp, completeSignup, resendLoginOtp, user, hydrated } = useAuth();

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [step, setStep] = useState("code"); // "code" | "name"
  const [name, setName] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [hintCode, setHintCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (hydrated && user) {
      router.replace(user.role === "admin" ? "/dashboard" : "/account");
    }
  }, [hydrated, user, router]);

  useEffect(() => {
    const hint = readOtpHint(phone);
    if (!hint) return;
    setHintCode(hint.code || "");
    setCooldown(Math.max(0, Math.ceil((hint.canResendAt - Date.now()) / 1000)));
  }, [phone]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  if (!phone) {
    return (
      <div className="rounded-soft border border-ink/10 bg-paper px-6 py-10 text-center">
        <p className="text-ink-soft">شماره‌ای برای تأیید مشخص نشده است.</p>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-4 rounded-full bg-ink px-7 py-3 text-sm text-cream hover:bg-clay-dark"
        >
          بازگشت به صفحه ورود
        </button>
      </div>
    );
  }

  function handleDigitChange(index, value) {
    const clean = value.replace(/[^\d]/g, "").slice(-1);
    setDigits((current) => {
      const next = [...current];
      next[index] = clean;
      return next;
    });
    if (clean && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(event) {
    const pasted = event.clipboardData.getData("text").replace(/[^\d]/g, "");
    if (!pasted) return;
    event.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    for (let i = 0; i < Math.min(pasted.length, CODE_LENGTH); i += 1) {
      next[i] = pasted[i];
    }
    setDigits(next);
    const focusIndex = Math.min(pasted.length, CODE_LENGTH) - 1;
    inputsRef.current[focusIndex]?.focus();
  }

  async function handleVerify(event) {
    event.preventDefault();
    setError("");
    const code = digits.join("");
    if (code.length !== CODE_LENGTH) {
      setError("کد ۶ رقمی را کامل وارد کنید.");
      return;
    }

    setVerifying(true);
    const result = await verifyLoginOtp(phone, code);
    setVerifying(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (result.isNewUser) {
      setStep("name");
      return;
    }

    router.push(result.user.role === "admin" ? "/dashboard" : "/account");
  }

  function handleCompleteSignup(event) {
    event.preventDefault();
    setError("");
    const result = completeSignup(phone, name);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/account");
  }

  async function handleResend() {
    if (cooldown > 0 || resending) return;
    setError("");
    setResending(true);
    const result = await resendLoginOtp(phone);
    setResending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    writeOtpHint(phone, { code: result.devCode, canResendAt: result.canResendAt });
    setHintCode(result.devCode || "");
    setDigits(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    setCooldown(Math.max(0, Math.ceil((result.canResendAt - Date.now()) / 1000)));
  }

  if (step === "name") {
    return (
      <>
        <span className="inline-flex items-center gap-2 rounded-full bg-sage/15 px-4 py-1.5 text-xs text-sage">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          شماره تأیید شد
        </span>

        <h1 className="mt-5 font-display text-4xl leading-tight text-ink md:text-5xl">
          یک قدم تا پایان
        </h1>
        <p className="mt-4 max-w-sm text-base leading-7 text-ink-soft">
          برای ساخت حساب، فقط نامتان را بنویسید - بقیه را خودمان می‌چینیم.
        </p>

        <form onSubmit={handleCompleteSignup} className="mt-10 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-ink-soft">نام و نام خانوادگی</label>
            <input
              autoFocus
              required
              minLength={2}
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-clay-dark">{error}</p>}

          <button type="submit" className="btn-primary w-full py-4 text-base">
            ساخت حساب و ورود
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-4 py-1.5 text-xs text-sky-dark">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-dark" />
        کد تأیید
      </span>

      <h1 className="mt-5 font-display text-4xl leading-tight text-ink md:text-5xl">
        کد را وارد کنید
      </h1>
      <p className="mt-4 text-base leading-7 text-ink-soft" dir="ltr">
        کد ۶ رقمی به شماره {phone} پیامک شد.
      </p>

      {hintCode && (
        <div className="mt-5 rounded-2xl border border-dust/30 bg-dust-light/20 px-5 py-4 text-xs leading-6 text-ink-soft">
          سرویس پیامک هنوز وصل نشده، برای همین کد فقط همین‌جا نمایش داده می‌شود - کد شما:{" "}
          <span dir="ltr" className="font-display text-base text-sky-dark">{hintCode}</span>
        </div>
      )}

      <form onSubmit={handleVerify} className="mt-10 space-y-7">
        <div className="flex justify-center gap-1.5 sm:gap-3" dir="ltr" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(event) => handleDigitChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className={`otp-digit h-12 w-9 rounded-xl border border-ink/15 bg-cream text-center font-display text-lg text-ink sm:h-16 sm:w-12 sm:rounded-2xl sm:text-2xl md:h-20 md:w-14 ${
                digit ? "is-filled" : ""
              }`}
            />
          ))}
        </div>

        {error && <p className="text-center text-sm text-clay-dark">{error}</p>}

        <button type="submit" disabled={verifying} className="btn-primary w-full py-4 text-base">
          {verifying ? "در حال بررسی…" : "تأیید کد"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || resending}
          className="w-full text-center text-sm text-sky-dark transition-colors hover:text-clay-dark disabled:cursor-not-allowed disabled:text-ink-soft"
        >
          {cooldown > 0 ? `ارسال دوباره کد تا ${cooldown} ثانیه دیگر` : "ارسال دوباره کد"}
        </button>
      </form>
    </>
  );
}
