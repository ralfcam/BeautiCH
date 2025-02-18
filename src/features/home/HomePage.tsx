import { Hero } from './components/Hero';
import { KeyHighlights } from './components/KeyHighlights';
import { FeaturedServices } from './components/FeaturedServices';
import { Benefits } from './components/Benefits';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <KeyHighlights />
      <FeaturedServices />
      <Benefits />
    </div>
  );
}