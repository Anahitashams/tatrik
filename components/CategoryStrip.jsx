"use client";

import { useEffect, useRef, useState } from "react";
import ProductVisual from "./ProductVisual";

const categories = [
  { label: "ماگ", icon: "mug", tone: "dust", accent: "#7C93A2" },
  { label: "کاسه", icon: "bowl", tone: "sage", accent: "#96A184" },
  { label: "بشقاب", icon: "plate", tone: "sand", accent: "#BD7E56" },
  { label: "گلدان", icon: "vase", tone: "clay", accent: "#93613D" },
  { label: "شمعدان", icon: "candle", tone: "dust", accent: "#6FA3C7" },
];

export default function CategoryStrip() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Reveal the row once, the moment it scrolls into view, instead of
  // always animating on page load - so scrolling back up to it later
  // doesn't feel broken by a one-shot effect that already fired off-screen.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
      <div className="flex gap-7 overflow-x-auto pb-3 md:justify-between md:gap-4 md:overflow-visible">
        {categories.map((category, index) => (
          <a
            key={category.label}
            href="#products"
            className="group relative flex flex-shrink-0 flex-col items-center gap-4 text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.9)",
              transition: `opacity 0.6s ease ${index * 0.09}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${
                index * 0.09
              }s`,
            }}
          >
            {/* Dashed "wheel" ring - invisible at rest, spins into view on hover */}
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-0 transition-opacity duration-300 group-hover:animate-spin-slow group-hover:opacity-70 md:h-[106px] md:w-[106px]"
              style={{ borderColor: category.accent }}
              aria-hidden="true"
            />

            <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-3">
              {/* Soft color halo behind the circle */}
              <span
                className="absolute inset-0 -z-10 scale-125 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ backgroundColor: category.accent }}
                aria-hidden="true"
              />

              <ProductVisual
                icon={category.icon}
                tone={category.tone}
                className="h-20 w-20 rounded-full ring-1 ring-ink/10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg md:h-24 md:w-24"
              />
            </div>

            <span className="relative text-sm text-ink-soft transition-colors duration-300 group-hover:text-ink">
              {category.label}
              <span
                className="absolute -bottom-1.5 right-1/2 h-[2px] w-0 translate-x-1/2 rounded-full transition-all duration-300 ease-out group-hover:w-6"
                style={{ backgroundColor: category.accent }}
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
