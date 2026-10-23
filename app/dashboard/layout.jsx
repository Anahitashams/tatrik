"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/lib/auth-context";

export default function AdminLayout({ children }) {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace("/login");
    } else if (user.role !== "admin") {
      router.replace("/account");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user || user.role !== "admin") {
    return null;
  }

  return (
    <main>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 pb-20 pt-28 md:flex-row md:px-10 md:pt-32">
        <AdminSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
