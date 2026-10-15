// Decorative illustration for the 404 page: a pot that's come apart on the
// wheel, under a sky-blue sun - "lost page" told through the site's own
// pottery language instead of a generic stock graphic.
export default function BrokenPotArt({ className = "" }) {
  return (
    <svg
      viewBox="0 0 440 440"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bp-sky" cx="50%" cy="30%" r="58%">
          <stop offset="0%" stopColor="#A9CBE0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#A9CBE0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bp-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D9AE85" />
          <stop offset="100%" stopColor="#93613D" />
        </linearGradient>
        <linearGradient id="bp-right" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BD7E56" />
          <stop offset="100%" stopColor="#7C5230" />
        </linearGradient>
      </defs>

      <circle cx="220" cy="190" r="200" fill="url(#bp-sky)" />
      <circle cx="220" cy="118" r="52" fill="#CBD7DE" opacity="0.85" />
      <circle cx="220" cy="118" r="52" stroke="#7C93A2" strokeWidth="2" opacity="0.4" />

      <ellipse cx="220" cy="382" rx="138" ry="16" fill="#37332C" opacity="0.08" />

      <g className="animate-float" style={{ animationDelay: "0s", animationDuration: "7.5s" }}>
        <path
          d="M176 160c-19 3-28 18-26 35-21 14-32 47-27 94 5 54 29 93 58 90 8-1 14-7 18-16l5-219c-10 3-20 9-28 16Z"
          fill="url(#bp-left)"
          transform="rotate(-5 176 280)"
        />
      </g>

      <g className="animate-float" style={{ animationDelay: "0.45s", animationDuration: "7.5s" }}>
        <path
          d="M258 160c19 3 28 18 26 35 21 14 32 47 27 94-5 54-29 93-58 90-8-1-14-7-18-16l-5-219c10 3 20 9 28 16Z"
          fill="url(#bp-right)"
          transform="rotate(5 258 280)"
        />
      </g>

      <polygon points="150,318 172,300 180,332" fill="#BD7E56" className="animate-float" style={{ animationDelay: "1s" }} />
      <polygon points="296,326 318,312 316,344" fill="#93613D" className="animate-float" style={{ animationDelay: "1.4s" }} />
      <polygon points="210,356 230,346 226,370" fill="#D9AE85" className="animate-float" style={{ animationDelay: "0.8s" }} />

      <circle cx="90" cy="150" r="6" fill="#96A184" className="animate-float" style={{ animationDelay: "0.3s" }} />
      <circle cx="350" cy="190" r="5" fill="#7C93A2" className="animate-float" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
}
