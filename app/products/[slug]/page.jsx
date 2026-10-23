"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ProductVisual from "@/components/ProductVisual";
import AddToCartButton from "@/components/AddToCartButton";
import Footer from "@/components/Footer";
import { formatPrice, categories } from "@/lib/products";
import { useProducts } from "@/lib/product-store";

const categoryLabel = Object.fromEntries(categories.map((c) => [c.slug, c.label]));

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { products, hydrated } = useProducts();

  const product = products.find((p) => p.slug === slug);

  if (hydrated && !product) {
    return (
      <main>
        <section className="mx-auto max-w-3xl px-6 pb-16 pt-28 text-center md:pb-24 md:pt-32">
          <p className="text-ink-soft">این محصول پیدا نشد؛ شاید حذف شده باشد.</p>
          <Link
            href="/products"
            className="btn-primary mt-6 inline-flex"
          >
            مشاهده محصولات
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return null;
  }

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const outOfStock = Number.isFinite(product.stock) && product.stock <= 0;

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <nav className="mb-8 text-sm text-ink-soft">
          <Link href="/products" className="hover:text-ink">
            محصولات
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-2">
          <ProductVisual
            icon={product.icon}
            tone={product.tone}
            image={product.imageUrl}
            className="aspect-square rounded-soft md:aspect-[4/5]"
          />

          <div>
            <h1 className="font-display text-3xl text-ink md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-ink-soft">{product.detail}</p>
            <p className="mt-6 text-xl text-clay-dark">{formatPrice(product.price)}</p>

            <p className="mt-6 max-w-md leading-8 text-ink-soft">{product.description}</p>

            <div className="mt-8">
              {outOfStock ? (
                <span className="inline-block rounded-full bg-ink/10 px-7 py-3 text-sm text-ink-soft">
                  ناموجود
                </span>
              ) : (
                <AddToCartButton slug={product.slug} productName={product.name} />
              )}
              {Number.isFinite(product.stock) && !outOfStock && product.stock <= 5 && (
                <p className="mt-2 text-xs text-clay-dark">فقط {product.stock} عدد باقی مانده</p>
              )}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6 text-sm">
              <div>
                <dt className="text-ink-soft">دسته</dt>
                <dd className="mt-1 text-ink">{categoryLabel[product.category] || product.category}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">ساخت</dt>
                <dd className="mt-1 text-ink">دست‌ساز، چرخ سفالگری</dd>
              </div>
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-ink/10 pt-12">
            <h2 className="font-display text-2xl text-ink">محصولات مشابه</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="group flex flex-col">
                  <ProductVisual
                    icon={item.icon}
                    tone={item.tone}
                    image={item.imageUrl}
                    className="aspect-square rounded-soft transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <h3 className="text-ink">{item.name}</h3>
                    <p className="shrink-0 text-sm text-clay-dark">{formatPrice(item.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
