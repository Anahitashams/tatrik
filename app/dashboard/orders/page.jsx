"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/products";
import { useOrders, STATUS_LABELS, STATUS_OPTIONS } from "@/lib/orders-store";

export default function AdminOrdersPage() {
  const { orders, hydrated, setStatus } = useOrders();
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">سفارش‌ها</h1>
      <p className="mt-2 text-sm text-ink-soft">
        مدیریت وضعیت سفارش‌های ثبت‌شده در همین مرورگر (داده‌ی تستی).
      </p>

      {!hydrated ? null : orders.length === 0 ? (
        <p className="mt-8 rounded-soft border border-ink/10 bg-paper px-6 py-14 text-center text-ink-soft">
          هنوز سفارشی ثبت نشده است.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {orders.map((order) => {
            const isOpen = expanded === order.orderId;
            return (
              <div key={order.orderId} className="rounded-soft border border-ink/10 bg-paper p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : order.orderId)}
                    className="text-right"
                  >
                    <p className="text-sm text-ink">
                      کد سفارش: <span className="text-clay-dark">{order.orderId}</span>
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">
                      {order.customer?.fullName || "مهمان"} · {order.customer?.phone || "—"} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-ink">{formatPrice(order.total)}</span>
                    <select
                      value={order.status}
                      onChange={(event) => setStatus(order.orderId, event.target.value)}
                      className="rounded-full border border-ink/15 bg-cream px-3 py-1.5 text-xs text-ink"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-4 border-t border-ink/10 pt-4">
                    <p className="text-xs text-ink-soft">آدرس: {order.customer?.address || "—"}</p>
                    <ul className="mt-3 divide-y divide-ink/10 text-sm">
                      {order.items.map((item) => (
                        <li key={item.slug} className="flex items-center justify-between py-2">
                          <span className="text-ink">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="text-ink-soft">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
