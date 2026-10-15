"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useProducts } from "./product-store";
import { getCurrentUser } from "./auth-context";
import { addOrder } from "./orders-store";

const CartContext = createContext(null);

const STORAGE_KEY = "tatrik-cart-v1";
export const SHIPPING_COST = 90000;

// Demo starting cart, only used the very first time a visitor opens the
// site (so the store doesn't look empty out of the box). Once a real
// cart is saved to the browser, that becomes the source of truth.
const DEMO_CART = [
  { slug: "mug-abgineh", quantity: 2 },
  { slug: "bowl-set-sabz", quantity: 1 },
  { slug: "candle-doghlo", quantity: 1 },
];

export function CartProvider({ children }) {
  // The product catalog now comes from the real server API (see
  // lib/product-store.js). The cart keeps React state in sync with it so
  // prices/stock stay current even while the cart itself stays in
  // localStorage (per-browser is fine for a shopping cart).
  const { products: catalog } = useProducts();

  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [checkoutState, setCheckoutState] = useState({
    status: "idle", // idle | loading | success | error
    order: null,
    error: null,
  });
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCart(Array.isArray(parsed) ? parsed : []);
      } else {
        setCart(DEMO_CART);
      }
    } catch (error) {
      setCart(DEMO_CART);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      // storage may be unavailable (private mode, quota, etc.) - ignore
    }
  }, [cart, hydrated]);

  const addItem = useCallback(
    (slug, quantity = 1) => {
      setCart((current) => {
        const product = catalog.find((p) => p.slug === slug);
        const stockLimit = Number.isFinite(product?.stock) ? product.stock : Infinity;
        const existing = current.find((line) => line.slug === slug);
        if (existing) {
          return current.map((line) =>
            line.slug === slug
              ? { ...line, quantity: Math.min(stockLimit, line.quantity + quantity) }
              : line
          );
        }
        return [...current, { slug, quantity: Math.min(stockLimit, quantity) }];
      });
    },
    [catalog]
  );

  const updateQuantity = useCallback(
    (slug, delta) => {
      setCart((current) =>
        current
          .map((line) => {
            if (line.slug !== slug) return line;
            const product = catalog.find((p) => p.slug === slug);
            const stockLimit = Number.isFinite(product?.stock) ? product.stock : Infinity;
            return {
              ...line,
              quantity: Math.min(stockLimit, Math.max(1, line.quantity + delta)),
            };
          })
          .filter((line) => line.quantity > 0)
      );
    },
    [catalog]
  );

  const setQuantity = useCallback((slug, quantity) => {
    setCart((current) =>
      current
        .map((line) =>
          line.slug === slug ? { ...line, quantity: Math.max(0, quantity) } : line
        )
        .filter((line) => line.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((slug) => {
    setCart((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const lines = useMemo(() => {
    return cart
      .map((line) => {
        const product = catalog.find((p) => p.slug === line.slug);
        return product ? { product, quantity: line.quantity } : null;
      })
      .filter((line) => line !== null);
  }, [cart, catalog]);

  const itemCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [lines]
  );

  const shipping = lines.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  const resetCheckout = useCallback(() => {
    setCheckoutState({ status: "idle", order: null, error: null });
  }, []);

  const checkout = useCallback(
    async (customer) => {
      setCheckoutState({ status: "loading", order: null, error: null });
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: lines.map((line) => ({
              slug: line.product.slug,
              name: line.product.name,
              price: line.product.price,
              quantity: line.quantity,
            })),
            customer,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setCheckoutState({
            status: "error",
            order: null,
            error: data?.error || "ثبت سفارش با خطا مواجه شد.",
          });
          return { ok: false, error: data?.error };
        }

        const currentUser = getCurrentUser();
        const orderWithOwner = {
          ...data.order,
          userPhone: currentUser?.phone || null,
        };
        addOrder(orderWithOwner);

        setCheckoutState({ status: "success", order: orderWithOwner, error: null });
        clearCart();
        return { ok: true, order: orderWithOwner };
      } catch (error) {
        setCheckoutState({
          status: "error",
          order: null,
          error: "اتصال به سرور تستی برقرار نشد. دوباره تلاش کنید.",
        });
        return { ok: false, error: "network" };
      }
    },
    [lines, clearCart]
  );

  const value = {
    cart,
    lines,
    itemCount,
    subtotal,
    shipping,
    total,
    hydrated,
    addItem,
    updateQuantity,
    setQuantity,
    removeItem,
    clearCart,
    checkout,
    checkoutState,
    resetCheckout,
    customerInfo,
    setCustomerInfo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
