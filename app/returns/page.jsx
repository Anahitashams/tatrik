import Footer from "@/components/Footer";

export const metadata = {
  title: "بازگشت کالا | خاک",
  description: "شرایط مرجوعی و بازگشت وجه سفارش‌های خاک.",
};

const items = [
  {
    title: "مهلت بازگشت",
    text: "تا ۷ روز پس از دریافت سفارش، در صورتی که ظرف استفاده نشده و در بسته‌بندی اصلی خود باشد، می‌توانید درخواست مرجوعی ثبت کنید.",
  },
  {
    title: "کالاهای آسیب‌دیده در ارسال",
    text: "اگر سفارش در مسیر حمل آسیب دیده، همان روز دریافت با عکس از ظرف و بسته‌بندی با ما در میان بگذارید تا بدون هیچ هزینه‌ای برایتان جایگزین یا مسترد شود.",
  },
  {
    title: "روند بازگشت وجه",
    text: "پس از تأیید مرجوعی، وجه سفارش حداکثر تا ۵ روز کاری به همان روش پرداخت اولیه بازگردانده می‌شود.",
  },
  {
    title: "کالاهای غیرقابل مرجوعی",
    text: "به دلیل دست‌ساز بودن هر قطعه، سفارش‌های سفارشی‌سازی‌شده (رنگ یا طرح اختصاصی) مشمول بازگشت کالا نمی‌شوند، مگر در صورت نقص ساخت.",
  },
];

export default function ReturnsPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky/10 px-4 py-1.5 text-xs text-sky-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-dark" />
          پشتیبانی
        </span>

        <h1 className="mt-5 font-display text-3xl text-ink md:text-4xl">بازگشت کالا</h1>
        <p className="mt-4 max-w-xl leading-8 text-ink-soft">
          اگر ظرفی که دستتان رسیده همانی نبود که می‌خواستید، کنارتان هستیم.
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
