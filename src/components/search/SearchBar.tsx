import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <Input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search services, locations, or providers..."
        className="flex-1 h-12 border-[var(--light-gray)]"
      />
      <Button 
        type="submit"
        className="h-12 bg-[var(--swiss-red)] hover:bg-[var(--swiss-red)]/90 text-white"
      >
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
}