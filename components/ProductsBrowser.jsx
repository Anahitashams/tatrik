"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { categories } from "@/lib/products";
import { useProducts } from "@/lib/product-store";

const categorySlugs = categories.map((c) => c.slug);

export default function ProductsBrowser() {
  const searchParams = useSearchParams();
  const { products } = useProducts();
  const requestedCategory = searchParams.get("category");
  const requestedSearch = searchParams.get("search") || "";

  const initialCategory =
    requestedCategory && categorySlugs.includes(requestedCategory)
      ? requestedCategory
      : "all";

  const [active, setActive] = useState(initialCategory);
  const [query, setQuery] = useState(requestedSearch);

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = active === "all" || product.category === active;
      const matchesQuery =
        normalizedQuery === "" ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.detail.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [active, query, products]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-ink/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive("all")}
            aria-pressed={active === "all"}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              active === "all"
                ? "bg-ink text-cream"
                : "bg-ink/5 text-ink-soft hover:bg-ink/10"
            }`}
          >
            همه
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActive(category.slug)}
              aria-pressed={active === category.slug}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                active === category.slug
                  ? "bg-ink text-cream"
                  : "bg-ink/5 text-ink-soft hover:bg-ink/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <label className="relative w-full sm:w-64">
          <span className="sr-only">جستجوی محصول</span>
          <input
            type="search"
            maxLength={60}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو در محصولات..."
            className="w-full rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-clay-dark"
          />
        </label>
      </div>

      <p className="mt-6 text-sm text-ink-soft">{visible.length} محصول</p>

      {visible.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-soft border border-ink/10 bg-paper px-6 py-10 text-center text-ink-soft">
          محصولی با این مشخصات پیدا نشد.
        </p>
      )}
    </div>
  );
}
