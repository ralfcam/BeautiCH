import { Award, Star, Calendar } from 'lucide-react';

export function Benefits() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-[var(--forest-green)]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-[var(--forest-green)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Certified Green</h3>
            <p className="text-muted-foreground">
              All services are eco-certified and sustainable
            </p>
          </div>
          <div>
            <div className="bg-[var(--forest-green)]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-[var(--forest-green)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
            <p className="text-muted-foreground">
              Highly rated professionals and services
            </p>
          </div>
          <div>
            <div className="bg-[var(--forest-green)]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-[var(--forest-green)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-muted-foreground">
              Simple and quick online booking process
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}