import { Star } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

const testimonials = [
  {
    name: "Sarah M.",
    location: "Zürich",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    rating: 5,
    comment: "Found my favorite eco-friendly salon through BeautiCH. The booking process was seamless!"
  },
  {
    name: "Thomas K.",
    location: "Geneva",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    rating: 4.8,
    comment: "Great platform for finding sustainable beauty services. Highly recommend!"
  },
  {
    name: "Maria L.",
    location: "Basel",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
    rating: 5,
    comment: "Love the virtual try-on feature! Makes choosing a new hairstyle so much easier."
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from our community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                </div>
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(testimonial.rating)
                          ? 'text-[var(--swiss-red)] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}