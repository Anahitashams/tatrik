// Decorative illustration for the login/verify illustration pane: a vase
// taking shape on a slowly turning wheel, in the site's clay/sky palette.
// Purely decorative (aria-hidden) - the sibling text carries the meaning.
export default function PotteryWheelArt({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 420"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pw-sky" cx="50%" cy="34%" r="58%">
          <stop offset="0%" stopColor="#A9CBE0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#A9CBE0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pw-vase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9AE85" />
          <stop offset="100%" stopColor="#93613D" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="180" fill="url(#pw-sky)" />

      <g style={{ transformBox: "fill-box", transformOrigin: "center" }} className="animate-spin-slow">
        <ellipse cx="200" cy="330" rx="152" ry="26" stroke="#7C93A2" strokeWidth="2" strokeDasharray="3 11" opacity="0.5" />
        <ellipse cx="200" cy="330" rx="112" ry="19" stroke="#7C93A2" strokeWidth="1.5" strokeDasharray="2 9" opacity="0.4" />
        <ellipse cx="200" cy="330" rx="72" ry="12" stroke="#7C93A2" strokeWidth="1.5" strokeDasharray="1 7" opacity="0.35" />
      </g>

      <ellipse cx="200" cy="332" rx="46" ry="12" fill="#37332C" opacity="0.08" />

      <path
        d="M200 66c-24 0-36 17-36 35-25 13-41 48-41 95 0 72 33 132 77 132s77-60 77-132c0-47-16-82-41-95 0-18-12-35-36-35Z"
        fill="url(#pw-vase)"
      />
      <ellipse cx="200" cy="101" rx="35" ry="10" fill="#F2ECE1" opacity="0.55" />
      <path d="M163 148c-19 5-27 22-18 39" stroke="#93613D" strokeWidth="9" strokeLinecap="round" />
      <path d="M237 148c19 5 27 22 18 39" stroke="#93613D" strokeWidth="9" strokeLinecap="round" />

      <circle cx="78" cy="118" r="7" fill="#96A184" className="animate-float" style={{ animationDelay: "0.2s" }} />
      <circle cx="330" cy="150" r="5" fill="#BD7E56" className="animate-float" style={{ animationDelay: "1.1s" }} />
      <circle cx="318" cy="300" r="8" fill="#7C93A2" className="animate-float" style={{ animationDelay: "0.6s" }} />
      <circle cx="70" cy="286" r="6" fill="#D9C6A3" className="animate-float" style={{ animationDelay: "1.6s" }} />
    </svg>
  );
}
