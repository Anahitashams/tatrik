// A fast, clearly-visible drifting light wash for section backgrounds -
// four big, saturated color blobs (sky-blue, clay, sand, sage) that swing
// around on their own independent timers (9-16s). Pure CSS (see
// .aurora-* in globals.css), so it needs no "use client".
//
// Usage: give the section `className="relative overflow-hidden"`, drop
// <AuroraGlow /> as its first child, and wrap the real content in a
// `relative z-10` wrapper so it sits above the glow.
export default function AuroraGlow() {
  return (
    <div className="aurora-field" aria-hidden="true">
      <span className="aurora-blob aurora-blob-sky" />
      <span className="aurora-blob aurora-blob-clay" />
      <span className="aurora-blob aurora-blob-sand" />
      <span className="aurora-blob aurora-blob-sage" />
    </div>
  );
}
