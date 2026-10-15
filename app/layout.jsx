import { Vazirmatn, Mirza } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";

const bodyFont = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// A warm, Naskh/Nastaliq-inspired Persian display face - more editorial
// and handcrafted-feeling than Noto Naskh Arabic, which reads closer to
// formal/religious typesetting. Fits a handmade-pottery brand better.
const displayFont = Mirza({
  subsets: ["arabic"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "43912073",
  description:
    "خاک، کارگاه سفالگری دست‌ساز؛ ماگ، کاسه، بشقاب و گلدان‌های سفالی با لعاب طبیعی و روحیه‌ی آرام.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <body className="font-body antialiased">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
