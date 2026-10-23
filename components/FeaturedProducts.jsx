"use client";

import Link from "next/link";
import ProductVisual from "./ProductVisual";
import Reveal from "./Reveal";
import SectionGlimmer from "./SectionGlimmer";
import { formatPrice } from "@/lib/products";
import { useProducts } from "@/lib/product-store";

const featuredSlugs = [
  {
    slug: "mug-abgineh",
    span: "md:col-span-3 md:row-span-2 aspect-[4/5] md:aspect-auto",
  },
  { slug: "bowl-set-sabz", span: "md:col-span-3 aspect-[4/3]" },
  { slug: "vase-khaki", span: "md:col-span-3 aspect-[4/3]" },
  { slug: "candle-doghlo", span: "md:col-span-2 aspect-square" },
  { slug: "plate-set-rozaneh", span: "md:col-span-2 aspect-square" },
  { slug: "plate-single-abi", span: "md:col-span-2 aspect-square" },
];

export default function FeaturedProducts() {
  const { products } = useProducts();

  const items = featuredSlugs
    .map(({ slug, span }) => {
      const product = products.find((p) => p.slug === slug);
      return product ? { product, span } : null;
    })
    .filter((item) => item !== null);

  // Fall back to the first few catalog items if none of the curated
  // slugs exist anymore (e.g. an admin deleted one of them).
  const displayItems =
    items.length > 0
      ? items
      : products.slice(0, 6).map((product, i) => ({ product, span: featuredSlugs[i]?.span || "md:col-span-2 aspect-square" }));

  return (
    <section
      id="products"
      className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24"
    >
      <Reveal className="mb-10 flex items-end justify-between gap-4">
        <div>
          <SectionGlimmer className="mb-3" tone="sky" />
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            منتخب کارگاه
          </h2>
          <p className="mt-3 max-w-md text-ink-soft">
            هر قطعه به‌تنهایی ساخته می‌شود؛ رنگ و بافت هر ظرف کمی با بقیه فرق
            دارد.
          </p>
        </div>
        <Link href="/products" className="btn-blossom hidden shrink-0 md:inline-flex">
          مشاهده همه محصولات
        </Link>
      </Reveal>

      <Reveal delay={0.1} className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
        {displayItems.map(({ product, span }) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className={`group flex flex-col ${span}`}
          >
            <ProductVisual
              icon={product.icon}
              tone={product.tone}
              image={product.imageUrl}
              className="flex-1 rounded-soft transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <h3 className="text-ink">{product.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{product.detail}</p>
              </div>
              <p className="shrink-0 text-sm text-clay-dark">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
