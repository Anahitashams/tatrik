export default function LeafShadow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 300 260"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#37332C" opacity="0.14" filter="url(#leafBlur)">
        <ellipse cx="30" cy="20" rx="22" ry="10" transform="rotate(-30 30 20)" />
        <ellipse cx="70" cy="45" rx="26" ry="11" transform="rotate(-20 70 45)" />
        <ellipse cx="115" cy="75" rx="30" ry="12" transform="rotate(-15 115 75)" />
        <ellipse cx="10" cy="70" rx="18" ry="8" transform="rotate(-45 10 70)" />
        <ellipse cx="55" cy="95" rx="20" ry="9" transform="rotate(-35 55 95)" />
        <path d="M0 0 L130 90" stroke="#37332C" strokeWidth="2" opacity="0.5" />
      </g>
      <defs>
        <filter id="leafBlur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
    </svg>
  );
}
