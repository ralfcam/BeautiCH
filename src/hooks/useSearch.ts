import { useState, useMemo } from 'react';
import { useServices } from '@/hooks/useServices';
import type { Database } from '@/types/supabase';

type Service = Database['public']['Tables']['services']['Row'];

export interface SearchFiltersState {
  location?: string;
  priceRange?: [number, number];
  availability?: string;
  language?: string;
  ecoFriendly?: boolean;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating';
}

export function useSearch() {
  const { services, loading, error } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFiltersState>({
    priceRange: [0, 200], // Default price range
    ecoFriendly: false,
    sortBy: 'relevance',
  });

  const filteredServices = useMemo(() => {
    let results = services.filter((service) => {
      // Search term filter
      const searchTermLower = searchTerm.toLowerCase().trim();
      const searchMatch = !searchTermLower || [
        service.title,
        service.description,
        service.location,
        `${service.price}`,
        service.availability,
      ].some(field => field?.toLowerCase().includes(searchTermLower));

      // Location filter
      const locationMatch = !filters.location || 
        service.location.toLowerCase() === filters.location.toLowerCase();

      // Price range filter with null safety
      const priceMatch = !filters.priceRange || (
        service.price >= (filters.priceRange[0] ?? 0) && 
        service.price <= (filters.priceRange[1] ?? 200)
      );

      // Availability filter
      const availabilityMatch = !filters.availability || 
        service.availability.toLowerCase() === filters.availability.toLowerCase();

      // Language filter (placeholder for future implementation)
      const languageMatch = !filters.language || true;

      // Eco-friendly filter
      const ecoFriendlyMatch = !filters.ecoFriendly || true; // Placeholder until eco-friendly field is added

      return searchMatch && locationMatch && priceMatch && 
             availabilityMatch && languageMatch && ecoFriendlyMatch;
    });

    // Apply sorting
    if (filters.sortBy) {
      results = [...results].sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    return results;
  }, [searchTerm, filters, services]);

  // Get unique locations for the filter dropdown
  const locations = useMemo(() => 
    [...new Set(services.map(service => service.location))].sort(),
  [services]);

  // Get price range bounds
  const priceRangeBounds = useMemo(() => {
    const prices = services.map(service => service.price);
    return {
      min: Math.min(...prices, 0),
      max: Math.max(...prices, 200),
    };
  }, [services]);

  // Get unique availability options
  const availabilityOptions = useMemo(() => 
    [...new Set(services.map(service => service.availability))].sort(),
  [services]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredServices,
    loading,
    error,
    // Metadata for filters
    locations,
    priceRangeBounds,
    availabilityOptions,
  };
}