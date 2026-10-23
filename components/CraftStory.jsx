import AuroraGlow from "./AuroraGlow";
import Reveal from "./Reveal";
import SectionGlimmer from "./SectionGlimmer";

const steps = [
  {
    n: "۱",
    title: "خاک‌گیری",
    text: "خاک رس از معادن محلی انتخاب و برای رسیدن به بافت مناسب چند هفته خمیر می‌شود.",
  },
  {
    n: "۲",
    title: "شکل‌دهی روی چرخ",
    text: "هر ظرف با دست و روی چرخ سفالگری شکل می‌گیرد، به همین دلیل هیچ دو قطعه‌ای دقیقاً یکسان نیستند.",
  },
  {
    n: "۳",
    title: "لعاب‌کاری",
    text: "لعاب‌ها از ترکیب خاکستر گیاهی و اکسیدهای معدنی ساخته می‌شوند؛ رنگ نهایی کمی غیرقابل پیش‌بینی است.",
  },
  {
    n: "۴",
    title: "پخت در کوره",
    text: "پخت نهایی در دمای بالای هزار درجه، ظرف را برای مصرف روزانه محکم و ماندگار می‌کند.",
  },
];

export default function CraftStory() {
  return (
    <section id="story" className="relative overflow-hidden border-y border-ink/10 bg-paper">
      <AuroraGlow />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal>
            <SectionGlimmer className="mb-3" tone="sky" />
            <h2 className="font-display text-3xl text-ink md:text-4xl">از خاک تا سفال</h2>
            <p className="mt-4 text-ink-soft">
              چهار مرحله، سه هفته، و دست‌هایی که هر روز همان کار را کمی متفاوت انجام می‌دهند.
            </p>
          </Reveal>

          <ol className="grid gap-8 sm:grid-cols-2">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.n} delay={0.08 * index} className="flex gap-4 rounded-2xl bg-paper/60 p-3 backdrop-blur-sm sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
                <span
                  className={`font-display text-2xl ${index % 2 === 0 ? "text-clay-dark" : "text-sky-dark"}`}
                >
                  {step.n}
                </span>
                <div>
                  <h3 className="text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
