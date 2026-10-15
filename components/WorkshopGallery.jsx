import ProductVisual from "./ProductVisual";

const tiles = [
  { icon: "mug", tone: "dust", span: "md:col-span-3 md:row-span-2" },
  { icon: "candle", tone: "sand", span: "md:col-span-3 md:row-span-2" },
  { icon: "vase", tone: "clay", span: "md:col-span-2" },
  { icon: "stack", tone: "sage", span: "md:col-span-2" },
  { icon: "bowl", tone: "dust", span: "md:col-span-2" },
  { icon: "plate", tone: "sand", span: "md:col-span-3" },
  { icon: "mug", tone: "sage", span: "md:col-span-3" },
];

export default function WorkshopGallery() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="mb-10 max-w-md">
        <h2 className="font-display text-3xl text-ink md:text-4xl">یک روز در کارگاه</h2>
        <p className="mt-3 text-ink-soft">
          گوشه‌هایی از میز کار، قفسه‌های خشک‌کردن و کوره‌ای که هفته‌ای دو بار روشن می‌شود.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:auto-rows-[9rem] md:grid-cols-6 md:gap-5">
        {tiles.map((tile, i) => (
          <ProductVisual
            key={`${tile.icon}-${i}`}
            icon={tile.icon}
            tone={tile.tone}
            className={`aspect-square rounded-soft md:aspect-auto ${tile.span}`}
          />
        ))}
      </div>
    </section>
  );
}
