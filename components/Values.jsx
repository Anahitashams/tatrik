const values = [
  {
    title: "کاملاً دست‌ساز",
    text: "هیچ قالب یا تولید انبوهی در کار نیست؛ هر قطعه از ابتدا تا انتها زیر دست یک نفر شکل می‌گیرد.",
  },
  {
    title: "لعاب طبیعی",
    text: "لعاب‌ها را خودمان از خاکستر گیاهی و مواد معدنی می‌سازیم، بدون رنگ‌دانه‌ی مصنوعی.",
  },
  {
    title: "تولید محدود",
    text: "هر کوره حداکثر چهل قطعه جا می‌گیرد؛ به همین دلیل برخی مدل‌ها زودتر تمام می‌شوند.",
  },
  {
    title: "ماندگار",
    text: "بدنه‌ی ضخیم و پخت بالا، این ظرف‌ها را برای استفاده‌ی روزمره و سال‌ها دوام می‌دهد.",
  },
];

export default function Values() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <h2 className="font-display text-3xl text-ink md:text-4xl">آنچه برایمان مهم است</h2>

      <div className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
        {values.map((value) => (
          <div
            key={value.title}
            className="grid gap-2 py-7 md:grid-cols-[1fr_2fr] md:items-baseline md:gap-8"
          >
            <h3 className="text-lg text-ink">{value.title}</h3>
            <p className="text-ink-soft leading-7">{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
