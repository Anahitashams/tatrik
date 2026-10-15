import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import FeaturedProducts from "@/components/FeaturedProducts";
import CraftStory from "@/components/CraftStory";
import Testimonial from "@/components/Testimonial";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <CraftStory />
      <Testimonial />
      <Newsletter />
      <Footer />
    </main>
  );
}
