import { HeroSection } from '@/features/home/components/HeroSection';
import { FeaturedSalons } from '@/features/home/components/FeaturedSalons';
import { Testimonials } from '@/features/home/components/Testimonials';
import { Newsletter } from '@/features/home/components/Newsletter';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedSalons />
      <Testimonials />
      <Newsletter />
    </div>
  );
}