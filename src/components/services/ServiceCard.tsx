import { Star, Award, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '@/components/ui/cta-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
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
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-bold text-xl">{service.title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {service.description}
            </CardDescription>
          </div>
          <div className="flex items-center bg-[var(--light-gray)] px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-[var(--swiss-red)] mr-1" />
            <span className="font-medium">{service.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            {service.location} • {service.availability}
          </div>
          <span className="font-semibold">CHF {service.price}</span>
        </div>
        <CTAButton 
          fullWidth 
          onClick={handleBooking}
          label={`Book ${service.title}`}
        >
          <Calendar className="mr-2 h-4 w-4" /> Book Now
        </CTAButton>
      </CardContent>
    </Card>
  );
}