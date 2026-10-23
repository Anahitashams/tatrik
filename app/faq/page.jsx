import Footer from "@/components/Footer";

export const metadata = {
  title: "سوالات متداول | خاک",
  description: "پاسخ پرسش‌های رایج درباره‌ی محصولات و سفارش‌های خاک.",
};

const faqs = [
  {
    q: "چرا رنگ و بافت دو ظرف مشابه کمی متفاوت است؟",
    a: "هر ظرف با دست و روی چرخ سفالگری شکل می‌گیرد و لعاب آن از ترکیب خاکستر گیاهی و اکسیدهای معدنی ساخته می‌شود؛ همین باعث می‌شود رنگ نهایی هر قطعه کمی منحصربه‌فرد باشد.",
  },
  {
    q: "آیا ظرف‌ها برای مایکروویو و ماشین ظرفشویی مناسب‌اند؟",
    a: "بله، همه‌ی محصولات پس از پخت نهایی در دمای بالا، مقاوم در برابر مایکروویو و ماشین ظرفشویی هستند؛ برای ماندگاری بیشتر لعاب، شست‌وشوی دستی را توصیه می‌کنیم.",
  },
  {
    q: "چطور سفارش سفارشی (رنگ یا اندازه‌ی دلخواه) ثبت کنم؟",
    a: "از طریق آیدی اینستاگرام یا تلگرام ما (tatrik_artsy) پیام بدهید؛ طرح، رنگ و زمان تحویل سفارش سفارشی را با هم هماهنگ می‌کنیم.",
  },
  {
    q: "هزینه و زمان ارسال چقدر است؟",
    a: "جزئیات کامل در صفحه‌ی «ارسال و تحویل» موجود است؛ به‌طور خلاصه، آماده‌سازی ۲ تا ۴ روز کاری و ارسال ۱ تا ۵ روز کاری بسته به شهر مقصد طول می‌کشد.",
  },
  {
    q: "اگر سفارش آسیب‌دیده به دستم برسد چه کار کنم؟",
    a: "همان روز دریافت، با عکس از ظرف و بسته‌بندی به ما اطلاع دهید؛ بدون هیچ هزینه‌ای برایتان جایگزین یا مسترد می‌شود. جزئیات در صفحه‌ی «بازگشت کالا».",
  },
  {
    q: "آیا امکان خرید حضوری از کارگاه هست؟",
    a: "بله، با هماهنگی قبلی از طریق صفحه‌ی تماس می‌توانید از کارگاه بازدید و خرید حضوری داشته باشید.",
  },
];

export default function FaqPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-4 py-1.5 text-xs text-sky-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-dark" />
          پشتیبانی
        </span>

        <h1 className="mt-5 font-display text-3xl text-ink md:text-4xl">سوالات متداول</h1>
        <p className="mt-4 max-w-xl leading-8 text-ink-soft">
          پاسخ چند پرسشی که بیشتر مشتری‌ها از ما می‌پرسند.
        </p>

        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-soft border border-ink/10 bg-paper p-5 open:bg-paper"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                <span>{item.q}</span>
                <span className="shrink-0 text-clay-dark transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-7 text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
