import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import CategorySection from "@/components/CategorySection";
import TimelineSection from "@/components/TimelineSection";
import Footer from "@/components/Footer";
import { categories } from "@/data/site";
import { getCategoryPhotos } from "@/lib/photos";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Bio />
        {categories.map((category) => (
          <CategorySection
            key={category.slug}
            category={category}
            photos={getCategoryPhotos(category.slug)}
          />
        ))}
        <TimelineSection />
      </main>
      <Footer />
    </>
  );
}
