import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { CTAButton } from '@/components/ui/cta-button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SearchFiltersState } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFilterChange: (filters: SearchFiltersState) => void;
  locations: string[];
  priceRangeBounds: { min: number; max: number };
  availabilityOptions: string[];
}

export default function SearchFilters({ 
  filters, 
  onFilterChange,
  locations,
  priceRangeBounds,
  availabilityOptions,
}: SearchFiltersProps) {
  const handlePriceRangeChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: value as [number, number] });
  };

  const handleReset = () => {
    onFilterChange({
      priceRange: [priceRangeBounds.min, priceRangeBounds.max],
      location: undefined,
      availability: undefined,
      language: undefined,
      ecoFriendly: false,
      sortBy: 'relevance',
    });
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(value => 
    value !== undefined && 
    (Array.isArray(value) ? value.some(v => v !== 0) : value !== false)
  ).length;

  return (
    <div className="lg:w-1/4 space-y-6">
      <div className="bg-card rounded-lg p-6 shadow-sm border border-[var(--light-gray)]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold flex items-center">
              <Filter className="mr-2 h-5 w-5 text-[var(--forest-green)]" /> Filters
            </h2>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="bg-[var(--forest-green)] text-white">
                {activeFilterCount} active
              </Badge>
            )}
          </div>
          <CTAButton 
            variant="outline"
            size="sm" 
            onClick={handleReset}
            disabled={activeFilterCount === 0}
            className={cn(
              "transition-opacity hover:text-[var(--swiss-red)]",
              activeFilterCount === 0 && "opacity-50"
            )}
            label="Reset filters"
          >
            Reset
          </CTAButton>
        </div>
        
        <div className="space-y-6">
          {/* Sort By */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => onFilterChange({ ...filters, sortBy: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Select
              value={filters.location}
              onValueChange={(value) => onFilterChange({ ...filters, location: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Price Range (CHF {filters.priceRange?.[0] ?? priceRangeBounds.min} - 
              CHF {filters.priceRange?.[1] ?? priceRangeBounds.max})
            </label>
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              min={priceRangeBounds.min}
              max={priceRangeBounds.max}
              step={5}
              className="mt-4"
            />
          </div>

          {/* Availability Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Availability</label>
            <Select
              value={filters.availability}
              onValueChange={(value) => onFilterChange({ ...filters, availability: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Language</label>
            <Select
              value={filters.language}
              onValueChange={(value) => onFilterChange({ ...filters, language: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Eco-Friendly Filter */}
          <div className="flex items-center space-x-2">
            <Switch
              id="eco-friendly"
              checked={filters.ecoFriendly}
              onCheckedChange={(checked) => 
                onFilterChange({ ...filters, ecoFriendly: checked })
              }
            />
            <Label htmlFor="eco-friendly" className="text-sm font-medium">
              Eco-Friendly Only
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}