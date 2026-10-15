import ProductVisual from "./ProductVisual";

export default function AboutHero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <ProductVisual
          icon="vase"
          tone="sand"
          className="order-2 aspect-[4/5] rounded-soft md:order-1"
        />
        <div className="order-1 md:order-2">
          <p className="text-sm tracking-wide text-clay-dark">درباره کارگاه خاک</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.3] text-ink md:text-5xl">
            کارگاهی کوچک، برای کارهایی که عجله ندارند
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-ink-soft">
            خاک را هفت سال پیش، در یک اتاقک کوچک با یک چرخ سفالگری قدیمی شروع کردیم. حالا
            چهار نفریم، هنوز در همان محله، و هنوز هر ظرف را با دست شکل می‌دهیم.
          </p>
        </div>
      </div>
    </section>
  );
}
