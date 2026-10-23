"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/products";
import { useAuth } from "@/lib/auth-context";
import { useOrders, STATUS_LABELS } from "@/lib/orders-store";

export default function AccountPage() {
  const { user, hydrated, logout } = useAuth();
  const { orders, hydrated: ordersHydrated } = useOrders();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return null;
  }

  const myOrders = ordersHydrated
    ? orders.filter((order) => order.userPhone === user.phone)
    : [];

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm tracking-wide text-clay-dark">حساب کاربری</p>
            <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
              سلام، {user.name}
            </h1>
            <p className="mt-2 text-sm text-ink-soft" dir="ltr">{user.phone}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="btn-outline"
          >
            خروج از حساب
          </button>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl text-ink">تاریخچه سفارش‌ها</h2>

          {!ordersHydrated ? null : myOrders.length === 0 ? (
            <div className="mt-6 rounded-soft border border-ink/10 bg-paper px-8 py-14 text-center">
              <p className="text-ink-soft">هنوز سفارشی ثبت نکرده‌اید.</p>
              <Link
                href="/products"
                className="btn-primary mt-6 inline-flex"
              >
                مشاهده محصولات
              </Link>
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {myOrders.map((order) => (
                <li key={order.orderId} className="rounded-soft border border-ink/10 bg-paper p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm text-ink">
                      کد سفارش: <span className="text-clay-dark">{order.orderId}</span>
                    </p>
                    <span className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink-soft">
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                  </p>
                  <ul className="mt-3 divide-y divide-ink/10 border-t border-ink/10 text-sm">
                    {order.items.map((item) => (
                      <li key={item.slug} className="flex items-center justify-between py-2">
                        <span className="text-ink">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-ink-soft">{formatPrice(item.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-sm">
                    <span className="text-ink-soft">مجموع</span>
                    <span className="text-ink">{formatPrice(order.total)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
