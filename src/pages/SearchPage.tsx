import { useSearch } from '@/hooks/useSearch';
import SearchFilters from '@/components/search/SearchFilters';
import SearchBar from '@/components/search/SearchBar';
import ServiceCard from '@/components/services/ServiceCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { useState } from 'react';

const ITEMS_PER_PAGE = 8;

export default function SearchPage() {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredServices,
    loading,
    error,
    locations,
    priceRangeBounds,
    availabilityOptions,
  } = useSearch();

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <SearchFilters
          filters={filters}
          onFilterChange={setFilters}
          locations={locations}
          priceRangeBounds={priceRangeBounds}
          availabilityOptions={availabilityOptions}
        />

        {/* Search Results */}
        <div className="lg:w-3/4">
          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          {/* Results Count */}
          <div className="mb-6 text-sm text-muted-foreground">
            {filteredServices.length} services found
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--swiss-red)]" />
            </div>
          )}

          {/* No Results Alert */}
          {!loading && filteredServices.length === 0 && (
            <Alert variant="default" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No services found matching your criteria. Try adjusting your filters or search term.
              </AlertDescription>
            </Alert>
          )}

          {/* Results Grid */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentServices.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={{
                      ...service,
                      image: service.image_url,
                    }} 
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}