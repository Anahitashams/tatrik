# خاک — صفحه اول فروشگاه سفال

پیاده‌سازی صفحه اول با Next.js 14 (App Router)، TypeScript و Tailwind CSS، راست‌به‌چپ (RTL) و به زبان فارسی.

## اجرای پروژه

```bash
npm install
npm run dev
```

سپس آدرس `http://localhost:3000` را باز کنید.

## ساختار پروژه

```
app/
  layout.tsx              تنظیمات فونت، RTL و متادیتا
  page.tsx                 صفحه اول
  about/page.tsx            درباره ما
  products/page.tsx          لیست محصولات (با فیلتر دسته‌بندی)
  products/[slug]/page.tsx    جزئیات یک محصول
  cart/page.tsx              سبد خرید
  globals.css                استایل‌های پایه
components/
  Navbar.tsx / Footer.tsx
  Hero.tsx / CategoryStrip.tsx / FeaturedProducts.tsx
  CraftStory.tsx / Testimonial.tsx / Newsletter.tsx
  AboutHero.tsx / FounderNote.tsx / Values.tsx / WorkshopGallery.tsx
  ProductCard.tsx / ProductsBrowser.tsx (فیلتر دسته‌بندی، کلاینت)
  AddToCartButton.tsx / CartView.tsx (کلاینت)
  ProductVisual.tsx          کامپوننت بصری جایگزین عکس محصول
lib/
  products.ts                داده‌ی محصولات و دسته‌بندی‌ها (منبع مشترک همه صفحات)
```

## نکته درباره سبد خرید

سبد خرید در `CartView.tsx` با state محلی (`useState`) کار می‌کند و برای نمونه با چند
کالای اولیه پر شده؛ افزودن از صفحه محصول فعلاً فقط یک تاییدیه‌ی بصری نشان می‌دهد و بین
صفحات همگام نیست. برای سبد خرید واقعی باید یک Context یا state management سراسری
(مثل Zustand) و اتصال به بک‌اند اضافه شود.

## اگر ویرایشگر خطای CSS یا فونت نشان داد

- خطای فونت: نام صحیح فونت سریف عربی در `next/font/google` دقیقاً `Noto_Naskh_Arabic`
  است (نه `Noto_Serif_Arabic`، که چنین فونتی اصلاً وجود ندارد).
- خطای `Cannot find module ... globals.css`: این خطا فقط در ویرایشگره و روی build
  تاثیری نداره. فایل `global.d.ts` این مشکل رو حل می‌کنه؛ اگر باز هم دیدید، در VS Code
  دستور «TypeScript: Select TypeScript Version» را بزنید و «Use Workspace Version» را
  انتخاب کنید (یا فقط `npm install` را بزنید تا `next-env.d.ts` درست تولید شود).

## جایگزینی عکس‌های واقعی

فعلاً به‌جای عکس محصولات، از `ProductVisual` (گرادیان + آیکون خطی) استفاده شده تا طراحی
بدون نیاز به فایل عکس اجرا شود. برای جایگزینی با عکس واقعی:

1. عکس‌ها را در پوشه `public/images` قرار دهید.
2. در هر کامپوننت (مثلاً `Hero.tsx` یا `FeaturedProducts.tsx`) به‌جای
   `<ProductVisual .../>` از `next/image` استفاده کنید:

```tsx
import Image from "next/image";

<Image
  src="/images/mug-1.jpg"
  alt="ماگ آبگینه"
  width={800}
  height={1000}
  className="rounded-soft object-cover"
/>
```

## پالت رنگ و فونت

- رنگ پایه: کرم `#F2ECE1`، جوهری `#37332C`
- رنگ‌های تاکیدی: آبی‌دودی `#A7B7C3`، خاکی/رس `#BD7E56`، شنی `#D9C6A3`، سبز مریمی `#96A184`
- فونت تیتر: Noto Serif Arabic — فونت متن: Vazirmatn
"# tatrik" 
