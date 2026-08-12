import FeaturedGear from "./_components/feturedGear/feturedGear";
import HeroSection from "./_components/heroSection/heroSection";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedGear />
    </div>
  );
}
