import Image from "next/image";
import ProductVisual from "./ProductVisual";
import HeroActions from "./HeroActions";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[720px] overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#F2ECE1]/20" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(167,183,195,0.28),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(189,126,86,0.14),transparent_32%),radial-gradient(circle_at_55%_100%,rgba(150,161,132,0.12),transparent_35%)]" />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F2ECE1] to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="mx-auto flex pt-36 min-h-[720px] max-w-6xl items-center px-6 py-28 md:px-10">
        <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* ================= TEXT ================= */}
          <div className="animate-rise md:-mt-8">
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-[#BD7E56]">
                کارگاه سفالگری خاک
              </p>

              <span className="h-px w-14 bg-[#BD7E56]/50" />
            </div>

            <h1 className="mt-5 max-w-xl font-display text-4xl font-bold text- leading-[1.45] text-[#52606A] md:text-5xl">
              بوبو که با دست شکل گرفته‌اند،
              <br /> برای میزی که هر روز دورش می‌نشینید.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#52606A]/80 md:text-[17px]">
              هر تکه در خاک، روی چرخ سفالگری و با لعاب‌های گیاهی ساخته می‌شود.
              رنگ‌ها از آسمان صبح و خاک نمناک الهام گرفته‌اند؛ بی‌قاعده، گرم و
              ماندگار.
            </p>

            <HeroActions />
          </div>

          {/* ================= PRODUCT CARDS ================= */}
          <div className="grid grid-cols-2 gap-4 md:-mt-8 md:gap-5">
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
        </div>
      </div>

      {/* خیلی ظریف برای اتصال Hero به بخش بعدی */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F2ECE1]/30 to-transparent" />
    </section>
  );
}
