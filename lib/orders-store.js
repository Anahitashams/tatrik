"use client";

import { useCallback, useEffect, useState } from "react";

// Test/demo order storage. Stands in for a real orders database: every
// successful checkout is appended here, keyed to the browser. In a real
// deployment this would live in a proper backend instead of localStorage.
const STORAGE_KEY = "tatrik-orders-v1";

export const STATUS_LABELS = {
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};

export const STATUS_OPTIONS = Object.keys(STATUS_LABELS);

function safeRead() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function safeWrite(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (error) {
    // storage unavailable - ignore
  }
}

export function addOrder(order) {
  const list = safeRead();
  const withStatus = { status: "processing", ...order };
  const next = [withStatus, ...list];
  safeWrite(next);
  return next;
}

export function updateOrderStatus(orderId, status) {
  const list = safeRead();
  const next = list.map((order) =>
    order.orderId === orderId ? { ...order, status } : order
  );
  safeWrite(next);
  return next;
}

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    setOrders(safeRead());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);
  }, [refresh]);

  const setStatus = useCallback((orderId, status) => {
    const next = updateOrderStatus(orderId, status);
    setOrders(next);
  }, []);

  return { orders, hydrated, refresh, setStatus };
}
