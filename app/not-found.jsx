import Link from "next/link";
import Footer from "@/components/Footer";
import BrokenPotArt from "@/components/art/BrokenPotArt";

export const metadata = {
  title: "صفحه پیدا نشد | خاک",
};

export default function NotFound() {
  return (
    <main>
      <section className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 overflow-hidden px-6 pb-24 pt-28 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-10 md:pb-32 md:pt-36">
        <div className="aura-field" />

        <div className="relative mx-auto w-full max-w-md md:order-2 md:max-w-none">
          <BrokenPotArt className="mx-auto w-full max-w-sm md:max-w-lg" />
        </div>

        <div className="relative text-center md:order-1 md:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-4 py-1.5 text-xs text-clay-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-clay-dark" />
            خطای ۴۰۴
          </span>

          <p className="mt-6 font-display text-8xl leading-none text-ink md:text-9xl">۴۰۴</p>

          <h1 className="mt-6 font-display text-3xl leading-tight text-ink md:text-4xl">
            این صفحه مثل کوزه‌ی شکسته، پیدا نشد
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-ink-soft md:mx-0">
            صفحه‌ای که دنبالش می‌گردید وجود ندارد یا جابه‌جا شده. می‌توانید به صفحه‌ی اصلی
            برگردید یا سری به فروشگاه بزنید - بقیه‌ی کوزه‌ها سالم‌اند.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Link href="/" className="btn-primary px-8 py-4 text-base">
              بازگشت به صفحه اصلی
            </Link>
            <Link href="/products" className="btn-outline px-8 py-4 text-base">
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
