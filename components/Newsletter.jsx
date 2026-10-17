"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data?.error || "عضویت با خطا مواجه شد.");
        return;
      }

      setStatus("success");
      setMessage(data?.message || "با موفقیت عضو خبرنامه شدید.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("اتصال به سرور برقرار نشد. دوباره تلاش کنید.");
    }
  }

  return (
    <section id="newsletter" className="bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-cream md:text-3xl">
              از ساخت قطعه‌های تازه باخبر شوید
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-cream/70">
              هر ماه یک ایمیل کوتاه، درباره‌ی محصولات جدید و باقیمانده‌های محدود کوره.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">
                ایمیل شما
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ایمیل شما"
                className="w-full rounded-full border border-cream/20 bg-transparent px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-cream/50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative shrink-0 overflow-hidden rounded-full bg-cream px-6 py-3 text-sm text-ink shadow-[0_0_0_0_rgba(189,126,86,0)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-8px_rgba(189,126,86,0.55)] disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
              >
                <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-clay-light via-sky-light to-sand opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                <span className="relative z-10">
                  {status === "loading" ? "در حال ارسال..." : "عضویت"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 z-0 w-1/3 -skew-x-12 bg-white/40 opacity-0 transition-opacity duration-200 group-hover:animate-shine group-hover:opacity-100" />
              </button>
            </div>

            {message && (
              <p
                className={`text-sm ${
                  status === "error" ? "text-[#E7A98F]" : "text-cream/80"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
