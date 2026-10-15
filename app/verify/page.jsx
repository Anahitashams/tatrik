import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthShell from "@/components/AuthShell";
import VerifyOtpForm from "@/components/VerifyOtpForm";

export const metadata = {
  title: "تأیید شماره تماس | خاک",
};

export default function VerifyPage() {
  return (
    <main>
      <Navbar />
      <AuthShell note="کد را وارد کنید تا حساب‌تان، مثل کوزه‌ای تازه از کوره، آماده شود.">
        <Suspense fallback={null}>
          <VerifyOtpForm />
        </Suspense>
      </AuthShell>
      <Footer />
    </main>
  );
}
