const toneGradients = {
  dust: "from-dust-light via-cream to-sand",
  clay: "from-clay-light via-cream to-dust-light",
  sand: "from-sand via-cream to-dust-light",
  sage: "from-sage/40 via-cream to-sand",
};

function Icon({ name }) {
  const stroke = "stroke-ink-soft/70";
  const strokeWidth = 1.4;

  switch (name) {
    case "mug":
      return (
        <svg viewBox="0 0 100 100" className="h-16 w-16">
          <path
            d="M30 34 h34 v34 a17 17 0 0 1 -34 0 z"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M64 42 h8 a9 9 0 0 1 0 18 h-8"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "bowl":
      return (
        <svg viewBox="0 0 100 100" className="h-16 w-16">
          <ellipse
            cx="50"
            cy="42"
            rx="26"
            ry="7"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M24 42 q26 26 52 0"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "vase":
      return (
        <svg viewBox="0 0 100 100" className="h-16 w-16">
          <path
            d="M42 28 h16 l3 10 q9 12 0 24 q-6 8 0 16 h-22 q6 -8 0 -16 q-9 -12 0 -24 z"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "plate":
      return (
        <svg viewBox="0 0 100 100" className="h-16 w-16">
          <ellipse
            cx="50"
            cy="50"
            rx="30"
            ry="12"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
          <ellipse
            cx="50"
            cy="50"
            rx="16"
            ry="6"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "candle":
      return (
        <svg viewBox="0 0 100 100" className="h-16 w-16">
          <path
            d="M38 46 h24 v26 a12 12 0 0 1 -24 0 z"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M50 46 v-14"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M50 22 q5 6 0 10 q-5 -4 0 -10 z"
            className="fill-clay/60"
          />
        </svg>
      );
    case "stack":
    default:
      return (
        <svg viewBox="0 0 100 100" className="h-16 w-16">
          <ellipse
            cx="50"
            cy="34"
            rx="20"
            ry="7"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
          <ellipse
            cx="50"
            cy="50"
            rx="20"
            ry="7"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
          <ellipse
            cx="50"
            cy="66"
            rx="20"
            ry="7"
            fill="none"
            className={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
  }
}

export default function ProductVisual({ icon, tone = "dust", image, className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-b ${toneGradients[tone]} ${className}`}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-full w-full object-cover" />
      ) : (
        <>
          <div className="absolute inset-x-6 bottom-6 h-px bg-ink-soft/20" />
          <Icon name={icon} />
        </>
      )}
    </div>
  );
}
