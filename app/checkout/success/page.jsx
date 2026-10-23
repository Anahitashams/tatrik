"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const { checkoutState, resetCheckout } = useCart();
  const order = checkoutState.order;

  return (
    <main>
      <section className="mx-auto max-w-2xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        {order ? (
          <div className="rounded-soft border border-ink/10 bg-paper px-8 py-14 text-center">
            <p className="font-display text-2xl text-ink">پرداخت با موفقیت انجام شد</p>
            <p className="mt-3 text-ink-soft">
              کد سفارش: <span className="text-clay-dark">{order.orderId}</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">مبلغ پرداخت‌شده (تستی): {formatPrice(order.total)}</p>
            <p className="mt-1 text-sm text-ink-soft">زمان تحویل تخمینی: {order.estimatedDelivery}</p>

            <ul className="mx-auto mt-8 max-w-sm divide-y divide-ink/10 border-y border-ink/10 text-right">
              {order.items.map((item) => (
                <li key={item.slug} className="flex items-center justify-between py-3 text-sm">
                  <span className="text-ink">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-ink-soft">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/products"
                onClick={resetCheckout}
                className="btn-primary"
              >
                بازگشت به فروشگاه
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-soft border border-ink/10 bg-paper px-8 py-16 text-center">
            <p className="text-ink-soft">سفارشی برای نمایش پیدا نشد.</p>
            <Link
              href="/products"
              className="btn-primary mt-6 inline-flex"
            >
              مشاهده محصولات
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
