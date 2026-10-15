"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

// Hero call-to-actions: a richer gradient + light-sweep on the primary
// button, a softer glass look on the secondary one, and - on click - a
// small burst of color (little clay/sky/sage "shards") from the exact
// point you clicked, echoing the site's pottery theme instead of a
// generic ripple.
const SHARD_COLORS = ["#BD7E56", "#93613D", "#7C93A2", "#96A184", "#D9C6A3", "#6FA3C7"];
const SHARD_COUNT = 16;

function burstFrom(x, y) {
  return Array.from({ length: SHARD_COUNT }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / SHARD_COUNT + Math.random() * 0.5;
    const distance = 65 + Math.random() * 80;
    return {
      id: `${Date.now()}-${i}-${Math.random()}`,
      x,
      y,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance - 26,
      rot: (Math.random() - 0.5) * 560,
      size: 5 + Math.random() * 10,
      color: SHARD_COLORS[Math.floor(Math.random() * SHARD_COLORS.length)],
      delay: Math.random() * 0.1,
      round: Math.random() > 0.5,
    };
  });
}

export default function HeroActions() {
  const [shards, setShards] = useState([]);
  const [wobbling, setWobbling] = useState(null);

  function handleBurst(event, key) {
    const burst = burstFrom(event.clientX, event.clientY);
    setShards((current) => [...current, ...burst]);
    setWobbling(key);
    window.setTimeout(() => {
      setShards((current) => current.filter((s) => !burst.some((b) => b.id === s.id)));
    }, 900);
    window.setTimeout(() => setWobbling((w) => (w === key ? null : w)), 460);
  }

  return (
    <>
      <div className="mt-9 flex flex-wrap items-center gap-5">
        {/* Primary: gradient fill, glow pulse at rest, light sweep + lift on hover */}
        <a
          href="#products"
          onClick={(event) => handleBurst(event, "products")}
          className={`group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-br from-ink via-ink to-clay-dark px-9 py-4 text-sm text-cream shadow-[0_14px_34px_-12px_rgba(55,51,44,0.55)] transition-all duration-300 animate-glow-pulse hover:-translate-y-1 hover:shadow-[0_20px_46px_-14px_rgba(189,126,86,0.65)] ${
            wobbling === "products" ? "animate-khak-wobble" : ""
          }`}
        >
          <span className="relative z-10">مشاهده محصولات</span>
          <ArrowLeft
            size={16}
            strokeWidth={2}
            className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="pointer-events-none absolute inset-y-0 right-0 z-0 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-opacity duration-200 group-hover:animate-shine group-hover:opacity-100" />
        </a>

        {/* Secondary: glassy outline, warms up and lifts on hover */}
        <a
          href="#story"
          onClick={(event) => handleBurst(event, "story")}
          className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-ink/25 bg-cream/30 px-9 py-4 text-sm text-ink backdrop-blur-[3px] transition-all duration-300 hover:-translate-y-1 hover:border-sky-dark/50 hover:bg-sky/10 hover:text-sky-dark hover:shadow-[0_16px_38px_-16px_rgba(111,163,199,0.55)] ${
            wobbling === "story" ? "animate-khak-wobble" : ""
          }`}
        >
          <span>داستان کارگاه</span>
          <ArrowLeft
            size={16}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </a>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[200]">
        {shards.map((shard) => (
          <span
            key={shard.id}
            className={shard.round ? "absolute rounded-full" : "absolute rounded-sm"}
            style={{
              left: shard.x,
              top: shard.y,
              width: shard.size,
              height: shard.size,
              backgroundColor: shard.color,
              animation: `khak-shard-fly 0.85s ease-out ${shard.delay}s forwards`,
              "--tx": `${shard.tx}px`,
              "--ty": `${shard.ty}px`,
              "--rot": `${shard.rot}deg`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes khak-shard-fly {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(var(--rot))
              scale(0.25);
            opacity: 0;
          }
        }
        @keyframes khak-wobble {
          0%, 100% { transform: translateY(-4px) rotate(0deg) scale(1); }
          15% { transform: translateY(-8px) rotate(-4deg) scale(1.04); }
          35% { transform: translateY(-2px) rotate(4deg) scale(0.98); }
          55% { transform: translateY(-9px) rotate(-3deg) scale(1.03); }
          75% { transform: translateY(-3px) rotate(3deg) scale(1); }
        }
        .animate-khak-wobble {
          animation: khak-wobble 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
