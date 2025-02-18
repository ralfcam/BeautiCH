import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Leaf, Award, Globe, Shield } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';

export function HeroSection() {
  const navigate = useNavigate();
  const { setSearchTerm } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
    navigate('/search');
  };

  return (
    <section className="relative min-h-[600px] flex items-center py-20 px-4 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-[var(--swiss-red)] via-[var(--forest-green)] to-[var(--swiss-red)] bg-[length:200%_200%]">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Logo and Branding */}
          <div className="flex items-center justify-center mb-8 animate-slide-down">
            <Leaf className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold beautich-logo-text">
              BeautiCH
            </h1>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 mb-8 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Your Beauty Journey Starts Here
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Find certified professionals and eco-friendly salons in your area
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-12 animate-fade-in">
            <div className="flex-1 relative">
              <Input
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                placeholder="Search by location or service..."
                className="h-14 bg-white/95 backdrop-blur-sm border-0 text-black placeholder:text-gray-500 pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <CTAButton 
              type="submit" 
              size="lg"
              variant="primary"
              className="h-14 px-8 min-w-[140px]"
              label="Search for beauty services"
            >
              Search
            </CTAButton>
          </form>

          {/* Feature Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up">
            <div className="flex items-center justify-center space-x-2 text-white/90 backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 hover:bg-white/20 transition-colors">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">Eco-Certified Services</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/90 backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 hover:bg-white/20 transition-colors">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">Multilingual Support</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/90 backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 hover:bg-white/20 transition-colors">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Verified Professionals</span>
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <CTAButton
              variant="secondary"
              size="lg"
              className="bg-[var(--forest-green)] hover:bg-[var(--forest-green)]/90"
              label="Discover eco-friendly salons"
              onClick={() => navigate('/eco-friendly')}
            >
              Discover Eco-Friendly Salons
            </CTAButton>
            <CTAButton
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              label="Learn about our sustainability mission"
              onClick={() => navigate('/about')}
            >
              Learn More
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}