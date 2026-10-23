"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { title: "خانه", href: "/" },
  { title: "فروشگاه", href: "/products" },
  { title: "درباره ما", href: "/about" },
  { title: "فرآیند ساخت", href: "/about#story" },
  { title: "تماس با ما", href: "#contact" },
];

function isItemActive(pathname, hash, href) {
  // A hash-only link (e.g. "#contact") points at a section of whatever
  // page you're on, not at a page of its own, so it's never "active" -
  // without this check, splitting "#contact" on "#" yields an empty
  // string, which fell through to the "/" case below and lit up the
  // underline on the homepage by mistake.
  if (href.startsWith("#")) return false;

  const [basePath, itemHash] = href.split("#");
  const pathMatches =
    basePath === "/" ? pathname === "/" : pathname === basePath || pathname.startsWith(`${basePath}/`);
  if (!pathMatches) return false;

  // "درباره ما" (/about) and "فرآیند ساخت" (/about#story) share a path,
  // so the path alone can't tell them apart - whichever one's hash (or
  // lack of one) matches the current URL is the one that lights up.
  return itemHash ? hash === `#${itemHash}` : !hash;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef(null);
  const [hash, setHash] = useState("");

  // Close the mobile menu and the search dropdown whenever the route
  // changes (link click, browser back/forward, etc.) so nothing is left
  // open on top of the new page.
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Track the URL hash too (pathname alone doesn't include it) so e.g.
  // "درباره ما" and "فرآیند ساخت" - which both live under /about - can
  // tell which one of them the current URL is actually pointing at.
  useEffect(() => {
    setHash(window.location.hash);
    function handleHashChange() {
      setHash(window.location.hash);
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  // Close the search dropdown on outside click.
  useEffect(() => {
    if (!searchOpen) return;
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    setSearchOpen(false);
    router.push(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : "/products");
  }

  function handleHomeClick(event) {
    // If we're already on the homepage, a normal Link click won't
    // navigate (and therefore won't scroll) - so scroll to top manually.
    if (pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  }

  // The fixed header sits on top of the page, so jumping straight to a
  // section's native anchor position tucks its top edge under the navbar.
  // Scrolling to it manually (minus the header's height) with "smooth"
  // behavior also feels far less abrupt than the instant native jump the
  // mobile menu's overlay-close + hash-nav combo used to produce.
  function handleAnchorClick(event, href) {
    setIsOpen(false);
    if (!href.startsWith("#")) return; // real page link - let Link navigate normally
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const headerOffset = 100;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", href);
    setHash(href);
  }

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-0 md:px-8 md:pt-5">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between rounded-[24px] border border-white/40 bg-[#F2ECE1]/75 px-4 shadow-[0_10px_40px_rgba(82,96,106,0.08)] backdrop-blur-xl md:px-6">
          {/* LOGO */}
          <Link href="/" onClick={handleHomeClick} className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#52606A]/15 bg-[#F2ECE1]/70 transition-transform duration-300 group-hover:rotate-6">
              <span className="h-3 w-3 rounded-full bg-[#BD7E56]" />
              <span className="absolute h-7 w-7 rounded-full border border-[#BD7E56]/30" />
            </div>

            <div className="leading-none">
              <span className="block font-display text-xl font-bold tracking-wide text-[#52606A]">
                Tatrik
              </span>

              <span className="mt-1 block text-[9px] tracking-[0.28em] text-[#BD7E56]">
                CERAMIC STUDIO
              </span>
            </div>
          </Link>

          {/* MENU */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isItemActive(pathname, hash, item.href);
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={
                    item.href === "/"
                      ? handleHomeClick
                      : (event) => handleAnchorClick(event, item.href)
                  }
                  className="group relative rounded-full px-4 py-2.5 text-[13px] text-[#52606A]/80 transition-all duration-300 hover:bg-white/50 hover:text-[#52606A]"
                >
                  {item.title}

                  <span
                    className={`absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#BD7E56] transition-all duration-300 ${
                      active ? "w-4" : "w-0 group-hover:w-4"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <div ref={searchRef} className="relative hidden sm:flex">
              <button
                type="button"
                aria-label="جستجو"
                onClick={() => setSearchOpen((open) => !open)}
                aria-expanded={searchOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#52606A] transition-all duration-300 hover:bg-white/60 hover:text-[#BD7E56]"
              >
                <Search size={18} strokeWidth={1.7} />
              </button>

              {searchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute left-0 top-12 z-10 flex w-64 items-center gap-2 rounded-full border border-[#52606A]/15 bg-[#F2ECE1] px-3 py-2 shadow-lg"
                >
                  <input
                    type="search"
                    autoFocus
                    maxLength={60}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="جستجوی محصول..."
                    className="w-full bg-transparent text-sm text-[#52606A] placeholder:text-[#52606A]/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="جستجو کن"
                    className="text-[#52606A] hover:text-[#BD7E56]"
                  >
                    <Search size={16} strokeWidth={1.8} />
                  </button>
                </form>
              )}
            </div>

            <Link
              href={user ? "/account" : "/login"}
              aria-label={user ? "حساب کاربری" : "ورود به حساب"}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-[#52606A] transition-all duration-300 hover:bg-white/60 hover:text-[#BD7E56] sm:flex"
            >
              <User size={18} strokeWidth={1.7} />
            </Link>

            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#52606A] text-[#F2ECE1] transition-all duration-300 hover:scale-105 hover:bg-[#BD7E56]"
            >
              <ShoppingBag size={17} strokeWidth={1.8} />

              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#BD7E56] px-1 text-[8px] text-white">
                {itemCount}
              </span>
            </Link>

            {/* MOBILE */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="باز کردن منو"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#52606A]/15 text-[#52606A] transition-all hover:bg-white/60 lg:hidden"
            >
              <Menu size={20} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {/* Kept mounted at all times and faded/slid in or out with a
          transition instead of being added/removed from the DOM outright -
          an instant mount/unmount made the menu feel like it was cutting
          to the section below rather than closing. */}
      <div
        className={`fixed inset-0 z-[100] bg-[#F2ECE1] transition-all duration-300 ease-out ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-3 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#A7B7C3]/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#BD7E56]/10 blur-3xl" />

          {/* TOP */}
          <div className="flex items-center justify-between px-6 py-6">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="font-display text-2xl font-bold text-[#52606A]"
            >
              Tatrik
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="بستن منو"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#52606A]/15"
            >
              <X size={20} />
            </button>
          </div>

          {/* MOBILE LINKS */}
          <nav className="mt-12 px-8">
            {navItems.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={
                  item.href === "/"
                    ? handleHomeClick
                    : (event) => handleAnchorClick(event, item.href)
                }
                className="group flex items-center justify-between border-b border-[#52606A]/10 py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#BD7E56]">0{index + 1}</span>

                  <span className="font-display text-2xl text-[#52606A]">
                    {item.title}
                  </span>
                </div>

                <ArrowLeft
                  size={20}
                  className="text-[#52606A]/40 transition-transform duration-300 group-hover:-translate-x-2"
                />
              </Link>
            ))}

            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between border-b border-[#52606A]/10 py-5"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#BD7E56]">0{navItems.length + 1}</span>
                <span className="font-display text-2xl text-[#52606A]">
                  سبد خرید ({itemCount})
                </span>
              </div>
              <ArrowLeft
                size={20}
                className="text-[#52606A]/40 transition-transform duration-300 group-hover:-translate-x-2"
              />
            </Link>

            <Link
              href={user ? "/account" : "/login"}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between border-b border-[#52606A]/10 py-5"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#BD7E56]">0{navItems.length + 2}</span>
                <span className="font-display text-2xl text-[#52606A]">
                  {user ? "حساب کاربری" : "ورود / ثبت‌نام"}
                </span>
              </div>
              <ArrowLeft
                size={20}
                className="text-[#52606A]/40 transition-transform duration-300 group-hover:-translate-x-2"
              />
            </Link>
          </nav>

          {/* BOTTOM */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs text-[#52606A]/50">
            <span>HANDMADE CERAMICS</span>
            <span>© TATRIK</span>
          </div>
      </div>
    </>
  );
}
