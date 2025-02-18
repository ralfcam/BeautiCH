import { useNavigate } from 'react-router-dom';
import { Star, Award, Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const featuredSalons = [
  {
    id: 1,
    name: "Natural Beauty Studio",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400&h=300",
    rating: 4.9,
    reviews: 128,
    location: "Bahnhofstrasse 15, Zürich",
    services: ["Hair", "Makeup", "Skincare"],
    ecoFriendly: true,
    availability: "Today",
    priceRange: "$$"
  },
  {
    id: 2,
    name: "Eco Wellness Spa",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=400&h=300",
    rating: 4.8,
    reviews: 95,
    location: "Rue du Rhône 42, Geneva",
    services: ["Massage", "Facial", "Body Treatments"],
    ecoFriendly: true,
    availability: "Tomorrow",
    priceRange: "$$$"
  },
  {
    id: 3,
    name: "Green Beauty Lab",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400&h=300",
    rating: 4.7,
    reviews: 73,
    location: "Freiestrasse 89, Basel",
    services: ["Skincare", "Nails", "Waxing"],
    ecoFriendly: true,
    availability: "Next Week",
    priceRange: "$$"
  }
];

const popularServices = [
  {
    id: 1,
    title: "Organic Hair Color",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400&h=300",
    price: "120+",
    duration: "2h",
    description: "Natural and ammonia-free hair coloring"
  },
  {
    id: 2,
    title: "Eco-Friendly Facial",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400&h=300",
    price: "95+",
    duration: "1h",
    description: "Deep cleansing with organic products"
  },
  {
    id: 3,
    title: "Natural Manicure",
    image: "https://images.unsplash.com/photo-1610992015732-2449b0c26670?auto=format&fit=crop&q=80&w=400&h=300",
    price: "65+",
    duration: "45m",
    description: "Non-toxic nail care treatment"
  },
  {
    id: 4,
    title: "Holistic Massage",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400&h=300",
    price: "110+",
    duration: "1h",
    description: "Relaxing massage with essential oils"
  }
];

export function FeaturedSalons() {
  const navigate = useNavigate();
  const [currentSalonIndex, setCurrentSalonIndex] = useState(0);

  const nextSalon = () => {
    setCurrentSalonIndex((prev) => 
      prev === featuredSalons.length - 1 ? 0 : prev + 1
    );
  };

  const prevSalon = () => {
    setCurrentSalonIndex((prev) => 
      prev === 0 ? featuredSalons.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 bg-accent/50">
      <div className="container mx-auto px-4">
        {/* Featured Salons */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Eco-Certified Salons</h2>
          <p className="text-lg text-muted-foreground">
            Discover our handpicked selection of sustainable beauty providers
          </p>
        </div>

        {/* Salon Carousel */}
        <div className="relative mb-20">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSalonIndex * 100}%)` }}
            >
              {featuredSalons.map((salon) => (
                <div key={salon.id} className="w-full flex-shrink-0 px-4">
                  <Card className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-video relative">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="eco-badge absolute top-2 right-2">
                        <Award className="h-4 w-4 mr-1" />
                        Green Badge™
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {salon.priceRange}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{salon.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {salon.location}
                          </CardDescription>
                        </div>
                        <div className="flex items-center bg-[var(--light-gray)] px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 text-[var(--swiss-red)] mr-1" />
                          <span className="font-medium">{salon.rating}</span>
                          <span className="text-sm text-muted-foreground ml-1">({salon.reviews})</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-wrap gap-2">
                          {salon.services.map((service) => (
                            <Badge
                              key={service}
                              variant="secondary"
                              className="bg-[var(--forest-green)]/10 text-[var(--forest-green)]"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {salon.availability}
                        </div>
                      </div>
                      <CTAButton
                        fullWidth
                        onClick={() => navigate(`/salon/${salon.id}`)}
                        label={`Book at ${salon.name}`}
                      >
                        <Calendar className="mr-2 h-4 w-4" /> Book Now
                      </CTAButton>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button
            onClick={prevSalon}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Previous salon"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSalon}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Next salon"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Popular Services */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Eco-Friendly Services</h2>
          <p className="text-lg text-muted-foreground">
            Most booked sustainable beauty treatments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularServices.map((service) => (
            <Card key={service.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-video relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  CHF {service.price}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration}
                  </div>
                  <Badge variant="secondary" className="bg-[var(--forest-green)]/10 text-[var(--forest-green)]">
                    Eco-Friendly
                  </Badge>
                </div>
                <CTAButton
                  fullWidth
                  variant="secondary"
                  onClick={() => navigate(`/service/${service.id}`)}
                  label={`Book ${service.title}`}
                >
                  Book Now
                </CTAButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}