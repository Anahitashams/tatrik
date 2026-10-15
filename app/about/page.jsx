import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import FounderNote from "@/components/FounderNote";
import Values from "@/components/Values";
import WorkshopGallery from "@/components/WorkshopGallery";
import CraftStory from "@/components/CraftStory";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export const metadata = {
  title: "درباره ما | خاک",
  description: "داستان کارگاه سفالگری خاک، از یک اتاقک کوچک تا امروز.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <FounderNote />
      <Values />
      <WorkshopGallery />
      <CraftStory />
      <Newsletter />
      <Footer />
    </main>
  );
}
