"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { products as seedProducts } from "./products";

// Client-side data hook for the product catalog. Talks to the real
// server-backed API in app/api/products (see lib/products-db.js) via
// axios, instead of reading/writing localStorage. Every browser that
// calls useProducts() sees the same catalog, fetched from the server.
export const TONE_OPTIONS = ["dust", "clay", "sand", "sage"];
export const ICON_OPTIONS = ["mug", "bowl", "vase", "plate", "candle", "stack"];

function withDefaults(product) {
  return { stock: 20, tone: "dust", icon: "mug", imageUrl: "", ...product };
}

export function useProducts() {
  // Seed the very first paint with the static catalog so there is no
  // flash of empty content while the first request to the server is in
  // flight. It's swapped for the real server response moments later.
  const [products, setProducts] = useState(() => seedProducts.map(withDefaults));
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data.products);
      setError(null);
    } catch (err) {
      setError("ارتباط با سرور محصولات برقرار نشد.");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addProduct = useCallback(async (input) => {
    const { data } = await axios.post("/api/products", input);
    setProducts((prev) => [...prev, data.product]);
    return data.product;
  }, []);

  const updateProduct = useCallback(async (slug, patch) => {
    const { data } = await axios.patch(`/api/products/${slug}`, patch);
    setProducts((prev) => prev.map((p) => (p.slug === slug ? data.product : p)));
    return data.product;
  }, []);

  const deleteProduct = useCallback(async (slug) => {
    await axios.delete(`/api/products/${slug}`);
    setProducts((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  return { products, hydrated, error, refresh, addProduct, updateProduct, deleteProduct };
}
