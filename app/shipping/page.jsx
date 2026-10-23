import Footer from "@/components/Footer";

export const metadata = {
  title: "ارسال و تحویل | خاک",
  description: "روش، زمان‌بندی و هزینه‌ی ارسال سفارش‌های خاک.",
};

const items = [
  {
    title: "زمان آماده‌سازی",
    text: "هر ظرف دست‌ساز است، برای همین سفارش‌ها معمولاً بین ۲ تا ۴ روز کاری آماده و بسته‌بندی می‌شوند؛ سفارش‌های حجیم (مثل سرویس‌های چندتکه) ممکن است کمی بیشتر طول بکشد.",
  },
  {
    title: "زمان ارسال",
    text: "برای تهران ۱ تا ۲ روز کاری و برای سایر شهرها ۲ تا ۵ روز کاری، از طریق پست پیشتاز یا تیپاکس انجام می‌شود.",
  },
  {
    title: "هزینه ارسال",
    text: "هزینه‌ی ارسال بر اساس وزن و مقصد در مرحله‌ی پرداخت محاسبه و نمایش داده می‌شود؛ هیچ هزینه‌ی پنهانی وجود ندارد.",
  },
  {
    title: "بسته‌بندی",
    text: "هر قطعه با کاغذ کرافت و لایه‌ی محافظ حباب‌دار جداگانه بسته‌بندی می‌شود تا در مسیر ارسال سالم به دستتان برسد.",
  },
];

export default function ShippingPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-4 py-1.5 text-xs text-sky-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-dark" />
          پشتیبانی
        </span>

        <h1 className="mt-5 font-display text-3xl text-ink md:text-4xl">ارسال و تحویل</h1>
        <p className="mt-4 max-w-xl leading-8 text-ink-soft">
          هر سفارش را با همان دقتی که روی چرخ سفالگری شکل می‌گیرد، بسته‌بندی و ارسال می‌کنیم.
        </p>

        <div className="mt-10 space-y-6">
          {items.map((item) => (
            <div key={item.title} className="rounded-soft border border-ink/10 bg-paper p-6">
              <h2 className="text-ink">{item.title}</h2>
              <p className="mt-2 leading-7 text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
