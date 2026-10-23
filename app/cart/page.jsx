import CartView from "@/components/CartView";
import Footer from "@/components/Footer";

export const metadata = {
  title: "سبد خرید | خاک",
};

export default function CartPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <h1 className="font-display text-3xl text-ink md:text-4xl">سبد خرید</h1>
        <div className="mt-10">
          <CartView />
        </div>
      </section>
      <Footer />
    </main>
  );
}
