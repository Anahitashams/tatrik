import ProductVisual from "./ProductVisual";
import HeroActions from "./HeroActions";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[620px] overflow-hidden sm:min-h-[660px] md:min-h-[720px]">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        {/* A plain <img> instead of next/image: this was the app's only
            Image usage, and unmounting a fill+priority next/image mid-load
            (e.g. navigating away quickly by clicking the cart icon) is a
            known trigger for React's "Failed to execute removeChild"
            crash in this Next.js version. A plain tag sidesteps that
            lifecycle entirely for a static local asset that doesn't need
            next/image's optimization pipeline. */}
        {/* .webp instead of the original .png: same image, ~89KB instead
            of 2.3MB - that PNG alone was the single biggest reason the
            site felt slow to load, especially as the LCP (largest
            contentful paint) element on the very first screen. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/background.webp"
          alt=""
          width={1536}
          height={1024}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[65%_center] md:object-center"
        />

        <div className="absolute inset-0 bg-[#F2ECE1]/20" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(167,183,195,0.28),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(189,126,86,0.14),transparent_32%),radial-gradient(circle_at_55%_100%,rgba(150,161,132,0.12),transparent_35%)]" />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F2ECE1] to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="mx-auto flex min-h-[620px] max-w-6xl items-center px-5 pb-16 pt-28 sm:px-6 sm:pt-32 md:min-h-[720px] md:px-10 md:py-28 md:pt-36">
        {/* A named-areas grid instead of plain column order: on mobile the
            copy comes first, then the product photos, then the buttons
            (three separate stacked blocks); on desktop the copy+buttons
            sit together in one column beside the photos, like before. CSS
            "order" alone can't express that - it only reshuffles items
            along one axis, it can't regroup copy+buttons back into the
            same column once images sits between them on mobile. */}
        <div className="hero-grid grid w-full items-center gap-10 md:gap-x-16 md:gap-y-9">
          {/* ================= COPY ================= */}
          <div className="hero-copy animate-rise text-center md:text-right">
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <p className="text-sm font-medium text-[#BD7E56]">
                کارگاه سفالگری خاک
              </p>

              <span className="h-px w-14 bg-[#BD7E56]/50" />
            </div>

            <h1 className="mx-auto mt-5 max-w-xl font-display text-[28px] font-bold leading-[1.45] text-[#52606A] sm:text-4xl md:mx-0 md:text-5xl">
              ظرف‌هایی که با دست شکل گرفته‌اند،
              <br /> برای میزی که هر روز دورش می‌نشینید.
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#52606A]/80 sm:mt-7 sm:text-base sm:leading-8 md:mx-0 md:text-[17px]">
              هر تکه در خاک، روی چرخ سفالگری و با لعاب‌های گیاهی ساخته می‌شود.
              رنگ‌ها از آسمان صبح و خاک نمناک الهام گرفته‌اند؛ بی‌قاعده، گرم و
              ماندگار.
            </p>
          </div>

          {/* ================= PRODUCT CARDS ================= */}
          {/* Shrunk down to a centered, phone-sized block on mobile
              instead of stretching full-width. */}
          <div className="hero-images mx-auto grid w-full max-w-[280px] grid-cols-2 gap-3 sm:max-w-sm sm:gap-4 md:mx-0 md:max-w-none md:gap-5">
            {/* Large card */}
            <ProductVisual
              icon="mug"
              tone="dust"
              className="col-span-2 aspect-[16/9] rounded-[14px]"
            />

            {/* Bottom left */}
            <ProductVisual
              icon="vase"
              tone="clay"
              className="aspect-square rounded-[14px]"
            />

            {/* Bottom right */}
            <ProductVisual
              icon="bowl"
              tone="sand"
              className="aspect-square rounded-[14px]"
            />
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="hero-actions flex justify-center md:justify-start">
            <HeroActions />
          </div>
        </div>
      </div>

      {/* خیلی ظریف برای اتصال Hero به بخش بعدی */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F2ECE1]/30 to-transparent" />

      <style jsx>{`
        .hero-grid {
          grid-template-areas: "copy" "images" "actions";
        }
        .hero-copy {
          grid-area: copy;
        }
        .hero-images {
          grid-area: images;
        }
        .hero-actions {
          grid-area: actions;
        }
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-areas: "copy images" "actions images";
          }
        }
      `}</style>
    </section>
  );
}
