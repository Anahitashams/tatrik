"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function AddToCartButton({ slug, productName }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(slug, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className="btn-primary"
    >
      {added ? `${productName} به سبد افزوده شد` : "افزودن به سبد خرید"}
    </button>
  );
}
