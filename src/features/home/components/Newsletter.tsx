import { CTAButton } from '@/components/ui/cta-button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  return (
    <section className="py-16 bg-[var(--forest-green)]/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter for eco-beauty tips and exclusive offers
          </p>
          <form className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 flex-1"
            />
            <CTAButton type="submit" label="Subscribe to newsletter">
              Subscribe
            </CTAButton>
          </form>
        </div>
      </div>
    </section>
  );
}