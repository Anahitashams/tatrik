// A thin accent line that sits above a section heading and, every few
// seconds, lets a short bright streak sweep across it - like a little
// comet passing along the line - instead of a static divider. Purely
// decorative (aria-hidden), and respects prefers-reduced-motion globally
// via the sitewide rule in globals.css.
export default function SectionGlimmer({ className = "", tone = "sky" }) {
  const toneColor = tone === "blossom" ? "#C98298" : tone === "clay" ? "#A2714B" : "#3F7699";

  return (
    <div
      className={`relative h-px w-16 overflow-hidden rounded-full bg-ink/10 ${className}`}
      aria-hidden="true"
    >
      <span
        className="khak-comet-streak absolute inset-y-0 right-0 w-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${toneColor}, transparent)`,
        }}
      />
      <style jsx>{`
        .khak-comet-streak {
          animation: khak-comet-sweep 6s ease-in-out infinite;
        }
        @keyframes khak-comet-sweep {
          0% {
            transform: translateX(120%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          48% {
            opacity: 1;
          }
          60% {
            transform: translateX(-280%);
            opacity: 0;
          }
          100% {
            transform: translateX(-280%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
