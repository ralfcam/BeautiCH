import { ChevronLeft, ChevronRight } from "lucide-react";
import { CTAButton } from "./cta-button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex items-center space-x-2"
    >
      <CTAButton
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </CTAButton>
      <div className="flex items-center space-x-2">
        {pages.map((page) => (
          <CTAButton
            key={page}
            variant={currentPage === page ? "primary" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={cn(
              "min-w-[2.5rem]",
              currentPage === page && "pointer-events-none"
            )}
            label={`Page ${page}`}
          >
            {page}
          </CTAButton>
        ))}
      </div>
      <CTAButton
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </CTAButton>
    </nav>
  );
}