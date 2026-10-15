import PotteryWheelArt from "./art/PotteryWheelArt";

// Shared two-pane shell for the login and verify pages: a wide, airy
// illustrated panel on larger screens (stacked above the form on mobile)
// so the phone + code flow feels like one considered moment instead of a
// bare form in the middle of the page.
export default function AuthShell({ note, children }) {
  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
      <div className="aura-field" />

      <div className="card-pot relative mx-auto grid grid-cols-1 overflow-hidden md:grid-cols-[1fr_1.15fr]">
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-dust-light/50 via-paper to-sand/25 p-10 md:flex">
          <div>
            <p className="font-display text-2xl text-ink">خاک</p>
            <p className="mt-1 text-xs tracking-wide text-ink-soft">کارگاه سفالگری دست‌ساز</p>
          </div>

          <PotteryWheelArt className="mx-auto w-full max-w-[17rem]" />

          <p className="text-sm leading-7 text-ink-soft">
            {note || "هر حساب، مثل هر کوزه، با یک چرخش ساده شکل می‌گیرد."}
          </p>
        </div>

        <div className="p-8 sm:p-12 md:p-16">{children}</div>
      </div>
    </section>
  );
}
