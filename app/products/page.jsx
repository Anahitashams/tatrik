import { Suspense } from "react";
import ProductsBrowser from "@/components/ProductsBrowser";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export const metadata = {
  title: "محصولات | خاک",
  description: "ماگ، کاسه، بشقاب، گلدان و شمعدان‌های سفالی دست‌ساز کارگاه خاک.",
};

export default function ProductsPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="mb-10 max-w-md">
          <p className="text-sm tracking-wide text-clay-dark">فروشگاه</p>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">همه محصولات</h1>
          <p className="mt-4 text-ink-soft">
            هر قطعه به‌تنهایی روی چرخ سفالگری شکل گرفته؛ رنگ و بافت هر ظرف کمی با بقیه فرق
            دارد.
          </p>
        </div>

        <Suspense fallback={null}>
          <ProductsBrowser />
        </Suspense>
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
