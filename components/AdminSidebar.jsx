"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const links = [
  { title: "نمای کلی", href: "/dashboard" },
  { title: "سفارش‌ها", href: "/dashboard/orders" },
  { title: "محصولات", href: "/dashboard/products" },
  { title: "مشتریان", href: "/dashboard/customers" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <aside className="h-fit w-full shrink-0 rounded-soft border border-ink/10 bg-paper p-4 md:w-56">
      <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        {links.map((link) => {
          const active =
            link.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm transition-colors md:rounded-lg ${
                active ? "bg-ink text-cream" : "text-ink-soft hover:bg-ink/5"
              }`}
            >
              {link.title}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 hidden border-t border-ink/10 pt-4 md:block">
        <Link href="/" className="block rounded-lg px-4 py-2.5 text-sm text-ink-soft hover:bg-ink/5">
          بازگشت به فروشگاه
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 block w-full rounded-lg px-4 py-2.5 text-right text-sm text-clay-dark hover:bg-ink/5"
        >
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}
