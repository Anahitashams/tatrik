"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

const inputClass =
  "w-full rounded-soft border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay-dark";

function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export default function TestPaymentGatewayPage() {
  const router = useRouter();
  const { lines, total, hydrated, customerInfo, checkout, checkoutState } = useCart();
  const [card, setCard] = useState({ number: "", holder: "", expiry: "", cvv: "" });

  const missingShippingInfo =
    hydrated && (!customerInfo.fullName || !customerInfo.address || !customerInfo.phone);

  // Guard against reaching the gateway with nothing to pay for, or before
  // shipping details were entered.
  useEffect(() => {
    if (!hydrated) return;
    if (lines.length === 0) {
      router.replace("/cart");
    } else if (missingShippingInfo) {
      router.replace("/checkout");
    }
  }, [hydrated, lines.length, missingShippingInfo, router]);

  if (!hydrated || lines.length === 0 || missingShippingInfo) {
    return null;
  }

  async function handlePay(event) {
    event.preventDefault();
    const result = await checkout(customerInfo);
    if (result.ok) {
      router.push("/checkout/success");
    }
  }

  const loading = checkoutState.status === "loading";

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-6 pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="rounded-soft border border-ink/10 bg-paper p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-xl text-ink">درگاه پرداخت آزمایشی</p>
              <p className="mt-1 text-xs text-ink-soft">Tatrik Test Gateway</p>
            </div>
            <span className="rounded-full bg-sage/20 px-3 py-1 text-[11px] text-ink-soft">
              حالت تستی
            </span>
          </div>

          <p className="mt-4 rounded-lg bg-ink/5 px-4 py-3 text-xs leading-6 text-ink-soft">
            این یک درگاه پرداخت تستی است. هیچ مبلغ واقعی کسر نمی‌شود و اطلاعات کارت واقعی وارد
            نکنید.
          </p>

          <div className="mt-5 flex items-baseline justify-between border-y border-ink/10 py-4">
            <span className="text-sm text-ink-soft">مبلغ قابل پرداخت</span>
            <span className="font-display text-2xl text-clay-dark">{formatPrice(total)}</span>
          </div>

          <form onSubmit={handlePay} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-ink-soft">شماره کارت</label>
              <input
                required
                inputMode="numeric"
                value={card.number}
                onChange={(event) =>
                  setCard((c) => ({ ...c, number: formatCardNumber(event.target.value) }))
                }
                placeholder="۱۲۳۴ ۱۲۳۴ ۱۲۳۴ ۱۲۳۴"
                maxLength={19}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-ink-soft">نام دارنده کارت</label>
              <input
                required
                value={card.holder}
                onChange={(event) => setCard((c) => ({ ...c, holder: event.target.value }))}
                placeholder="به لاتین یا فارسی"
                className={inputClass}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1.5 block text-sm text-ink-soft">تاریخ انقضا</label>
                <input
                  required
                  value={card.expiry}
                  onChange={(event) => setCard((c) => ({ ...c, expiry: event.target.value }))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={inputClass}
                />
              </div>
              <div className="w-24">
                <label className="mb-1.5 block text-sm text-ink-soft">CVV2</label>
                <input
                  required
                  inputMode="numeric"
                  value={card.cvv}
                  onChange={(event) =>
                    setCard((c) => ({ ...c, cvv: event.target.value.replace(/\D/g, "").slice(0, 4) }))
                  }
                  placeholder="123"
                  maxLength={4}
                  className={inputClass}
                />
              </div>
            </div>

            {checkoutState.status === "error" && checkoutState.error && (
              <p className="text-sm text-clay-dark">{checkoutState.error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "در حال ارتباط با درگاه..." : `پرداخت ${formatPrice(total)}`}
            </button>
          </form>

          <Link href="/checkout" className="mt-4 block text-center text-sm text-ink-soft hover:text-ink">
            بازگشت و ویرایش اطلاعات ارسال
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
