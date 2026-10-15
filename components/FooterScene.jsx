export default function FooterScene({ className = "" }) {
  return (
    <svg
      viewBox="0 0 320 260"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ledgeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9AE85" />
          <stop offset="100%" stopColor="#BD7E56" />
        </linearGradient>
        <linearGradient id="vaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDE6D8" />
          <stop offset="100%" stopColor="#D9C6A3" />
        </linearGradient>
        <linearGradient id="bowlGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EDE6D8" />
          <stop offset="100%" stopColor="#CBD7DE" />
        </linearGradient>
      </defs>

      {/* stone ledge */}
      <path d="M0 190 L320 150 L320 260 L0 260 Z" fill="url(#ledgeGrad)" opacity="0.9" />
      <path d="M0 190 L320 150" stroke="#93613D" strokeWidth="2" opacity="0.4" fill="none" />

      {/* vase */}
      <path
        d="M195 60 h34 l6 18 q14 18 0 36 q-9 12 0 24 v22 h-46 v-22 q9 -12 0 -24 q-14 -18 0 -36 z"
        fill="url(#vaseGrad)"
        stroke="#93613D"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />

      {/* olive branch */}
      <path
        d="M212 58 C 220 30, 236 14, 262 4"
        fill="none"
        stroke="#96A184"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M222 40 C 232 24, 248 16, 268 18"
        fill="none"
        stroke="#96A184"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      {[
        [222, 45], [232, 34], [244, 24], [256, 14], [266, 6],
        [230, 32], [242, 20], [254, 12], [264, 20], [246, 30],
      ].map(([x, y], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="6"
          ry="3"
          fill="#96A184"
          opacity={0.55 + (i % 3) * 0.12}
          transform={`rotate(${(i * 37) % 180} ${x} ${y})`}
        />
      ))}

      {/* bowl */}
      <ellipse cx="120" cy="176" rx="58" ry="16" fill="url(#bowlGrad)" stroke="#7C93A2" strokeWidth="1.2" strokeOpacity="0.35" />
      <path d="M66 176 q54 30 108 0" fill="none" stroke="#7C93A2" strokeWidth="1.2" strokeOpacity="0.4" />
    </svg>
  );
}
