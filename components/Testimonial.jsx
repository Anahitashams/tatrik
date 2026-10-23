import Reveal from "./Reveal";
import SectionGlimmer from "./SectionGlimmer";

export default function Testimonial() {
  return (
    <Reveal as="section" className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
      <SectionGlimmer className="mx-auto mb-5" tone="blossom" />
      <p className="font-display text-2xl leading-[1.6] text-ink md:text-3xl">
        ماگی که هر صبح دستم می‌گیرم، همان اولین سفارشم از خاک است؛ بعد از دو سال هنوز رنگش
        برایم تازه است.
      </p>
      <p className="mt-6 text-sm text-ink-soft">مریم رضایی، مشتری کارگاه</p>
    </Reveal>
  );
}
