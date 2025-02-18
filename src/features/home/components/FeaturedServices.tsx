import { useNavigate } from 'react-router-dom';
import { Star, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const featuredServices = [
  {
    id: 1,
    title: 'Eco-Friendly Hair Salon',
    description: 'Sustainable hair care using organic products',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400&h=300',
    price: '85+',
  },
  {
    id: 2,
    title: 'Natural Spa Experience',
    description: 'Holistic wellness with natural ingredients',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=400&h=300',
    price: '75+',
  },
  {
    id: 3,
    title: 'Organic Skincare Studio',
    description: 'Premium organic facial treatments',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400&h=300',
    price: '60+',
  },
];

export function FeaturedServices() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-accent/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Eco-Certified Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-video relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full"
                />
                <div className="eco-badge absolute top-2 right-2">
                  <Award className="h-4 w-4 mr-1" />
                  Green Badge™
                </div>
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-[var(--swiss-red)] mr-1" />
                    <span>{service.rating}</span>
                  </div>
                  <span className="font-semibold">CHF {service.price}</span>
                </div>
                <Button 
                  className="w-full bg-[var(--swiss-red)] hover:bg-[var(--swiss-red)]/90 text-white"
                  onClick={() => navigate(`/service/${service.id}`)}
                >
                  <Calendar className="mr-2 h-4 w-4" /> Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}