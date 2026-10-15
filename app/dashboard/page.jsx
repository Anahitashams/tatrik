"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { useAuth } from "@/lib/auth-context";
import { useOrders, STATUS_LABELS } from "@/lib/orders-store";
import { useProducts } from "@/lib/product-store";

export default function AdminOverviewPage() {
  const { user, listUsers } = useAuth();
  const { orders, hydrated } = useOrders();
  const { products, hydrated: productsHydrated } = useProducts();

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const customerCount = listUsers().filter((u) => u.role === "customer").length;
  const recentOrders = orders.slice(0, 5);

  const stats = [
    { label: "تعداد سفارش‌ها", value: hydrated ? orders.length : "…" },
    { label: "مجموع فروش (تستی)", value: hydrated ? formatPrice(totalRevenue) : "…" },
    { label: "تعداد محصولات", value: productsHydrated ? products.length : "…" },
    { label: "تعداد مشتریان", value: customerCount },
  ];

  return (
    <div>
      <p className="text-sm tracking-wide text-clay-dark">پنل مدیریت</p>
      <h1 className="mt-2 font-display text-3xl text-ink">خوش آمدید، {user?.name}</h1>
      <p className="mt-2 text-sm text-ink-soft">
        این داده‌ها از حافظه‌ی محلی همین مرورگر خوانده می‌شوند (بستر تستی)؛ در نسخه‌ی واقعی از یک
        پایگاه داده متصل می‌آیند.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-soft border border-ink/10 bg-paper p-5">
            <p className="text-xs text-ink-soft">{stat.label}</p>
            <p className="mt-2 font-display text-xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">سفارش‌های اخیر</h2>
          <Link href="/dashboard/orders" className="text-sm text-ink-soft hover:text-ink">
            مشاهده همه
          </Link>
        </div>

        {!hydrated ? null : recentOrders.length === 0 ? (
          <p className="mt-4 rounded-soft border border-ink/10 bg-paper px-6 py-8 text-center text-sm text-ink-soft">
            هنوز سفارشی ثبت نشده است.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-soft border border-ink/10">
            <table className="w-full min-w-[560px] text-right text-sm">
              <thead className="bg-ink/5 text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-normal">کد سفارش</th>
                  <th className="px-4 py-3 font-normal">مشتری</th>
                  <th className="px-4 py-3 font-normal">مبلغ</th>
                  <th className="px-4 py-3 font-normal">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 bg-paper">
                {recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="px-4 py-3 text-clay-dark">{order.orderId}</td>
                    <td className="px-4 py-3 text-ink">{order.customer?.fullName || "—"}</td>
                    <td className="px-4 py-3 text-ink">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3 text-ink-soft">
                      {STATUS_LABELS[order.status] || order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
