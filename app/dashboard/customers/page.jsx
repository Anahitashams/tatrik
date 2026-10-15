"use client";

import { useAuth } from "@/lib/auth-context";
import { useOrders } from "@/lib/orders-store";

export default function AdminCustomersPage() {
  const { listUsers } = useAuth();
  const { orders, hydrated } = useOrders();

  const customers = listUsers().filter((u) => u.role === "customer");

  function orderCountFor(phone) {
    if (!hydrated) return "…";
    return orders.filter((order) => order.userPhone === phone).length;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">مشتریان</h1>
      <p className="mt-2 text-sm text-ink-soft">
        حساب‌های ثبت‌شده در همین مرورگر ({customers.length} مشتری).
      </p>

      {customers.length === 0 ? (
        <p className="mt-8 rounded-soft border border-ink/10 bg-paper px-6 py-14 text-center text-ink-soft">
          هنوز مشتری‌ای ثبت‌نام نکرده است.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-soft border border-ink/10">
          <table className="w-full min-w-[520px] text-right text-sm">
            <thead className="bg-ink/5 text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-normal">نام</th>
                <th className="px-4 py-3 font-normal">شماره تماس</th>
                <th className="px-4 py-3 font-normal">تاریخ عضویت</th>
                <th className="px-4 py-3 font-normal">تعداد سفارش</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 bg-paper">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-4 py-3 text-ink">{customer.name}</td>
                  <td className="px-4 py-3 text-ink-soft" dir="ltr">{customer.phone}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {new Date(customer.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="px-4 py-3 text-ink">{orderCountFor(customer.phone)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
