"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import ProductVisual from "@/components/ProductVisual";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { sanitizePhoneInput } from "@/lib/phone";

const inputClass =
  "w-full rounded-soft border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay-dark";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, shipping, total, hydrated, customerInfo, setCustomerInfo } = useCart();
  const [form, setForm] = useState(customerInfo);

  // Nothing to check out - send the visitor back to their cart instead of
  // showing a broken/empty checkout page.
  useEffect(() => {
    if (hydrated && lines.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, lines.length, router]);

  if (!hydrated || lines.length === 0) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCustomerInfo(form);
    router.push("/checkout/pay");
  }

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <h1 className="font-display text-3xl text-ink md:text-4xl">اطلاعات ارسال</h1>
        <p className="mt-3 max-w-lg text-ink-soft">
          این اطلاعات فقط برای هماهنگی ارسال سفارش تستی استفاده می‌شود.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-ink-soft">نام و نام خانوادگی</label>
              <input
                required
                minLength={2}
                maxLength={60}
                value={form.fullName}
                onChange={(event) => setForm((f) => ({ ...f, fullName: event.target.value }))}
                placeholder="مثلاً سارا مرادی"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-ink-soft">شماره تماس</label>
              <input
                type="tel"
                dir="ltr"
                required
                inputMode="numeric"
                pattern="09[0-9]{9}"
                maxLength={11}
                minLength={11}
                title="شماره موبایل باید ۱۱ رقم باشد و با 09 شروع شود"
                value={form.phone}
                onChange={(event) =>
                  setForm((f) => ({ ...f, phone: sanitizePhoneInput(event.target.value) }))
                }
                placeholder="09121234567"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-ink-soft">آدرس تحویل</label>
              <textarea
                required
                rows={3}
                minLength={10}
                maxLength={300}
                value={form.address}
                onChange={(event) => setForm((f) => ({ ...f, address: event.target.value }))}
                placeholder="شهر، خیابان، پلاک، واحد"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full md:w-auto"
            >
              ادامه به درگاه پرداخت
            </button>
          </form>

          <aside className="h-fit rounded-soft border border-ink/10 bg-paper p-6">
            <h2 className="text-ink">سفارش شما</h2>
            <ul className="mt-4 space-y-4">
              {lines.map(({ product, quantity }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <ProductVisual
                    icon={product.icon}
                    tone={product.tone}
                    className="h-14 w-14 shrink-0 rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-ink">{product.name}</p>
                    <p className="text-xs text-ink-soft">تعداد: {quantity}</p>
                  </div>
                  <p className="shrink-0 text-sm text-clay-dark">
                    {formatPrice(product.price * quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-3 border-t border-ink/10 pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">جمع کالاها</dt>
                <dd className="text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">هزینه ارسال</dt>
                <dd className="text-ink">{formatPrice(shipping)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 text-ink">
              <span>مجموع</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link href="/cart" className="mt-5 block text-center text-sm text-ink-soft hover:text-ink">
              بازگشت به سبد خرید
            </Link>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
