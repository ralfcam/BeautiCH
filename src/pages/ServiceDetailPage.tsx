import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Award, Calendar, Clock, MapPin, Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useBooking } from '@/context/BookingContext';
import { toast } from 'sonner';
import type { Database } from '@/types/supabase';

type Service = Database['public']['Tables']['services']['Row'];

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createBooking } = useBooking();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    async function fetchService() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setService(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--swiss-red)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The service you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate('/search')}>
          Back to Search
        </Button>
      </div>
    );
  }

  const handleBooking = () => {
    // Calculate tax and total
    const tax = service.price * 0.08; // 8% VAT
    const total = service.price + tax;

    // Create booking details
    const bookingDetails = {
      id: `BOK-${Date.now()}`,
      service: {
        id: service.id,
        title: service.title,
        price: service.price,
      },
      date: selectedDate,
      time: selectedTime,
      provider: {
        name: 'Natural Beauty Studio',
        address: 'Bahnhofstrasse 15, 8001 Zürich',
        rating: 4.8,
      },
      payment: {
        method: 'Credit Card (**** 1234)',
        subtotal: service.price,
        tax,
        total,
      },
    };

    // Save booking details to context
    createBooking(bookingDetails);
    
    // Show success message
    toast.success('Booking created successfully!');
    
    // Navigate to confirmation page
    navigate('/booking-confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Service Image and Basic Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="relative">
            <img
              src={service.image_url}
              alt={service.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="eco-badge absolute top-4 right-4">
              <Award className="h-4 w-4 mr-1" />
              Green Badge™
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-[var(--swiss-red)] mr-1" />
              <span className="font-semibold mr-2">{service.rating}</span>
              <span className="text-muted-foreground">(128 reviews)</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {service.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {service.availability}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Globe className="h-4 w-4 mr-2" />
                Languages: English, German
              </div>
            </div>
            <div className="mt-6">
              <span className="text-2xl font-bold">CHF {service.price}</span>
              <span className="text-muted-foreground ml-2">per session</span>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <Card>
          <CardHeader>
            <CardTitle>Book Your Appointment</CardTitle>
            <CardDescription>Select your preferred date and time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Choose a date</option>
                  <option value="2024-03-28">March 28, 2024</option>
                  <option value="2024-03-29">March 29, 2024</option>
                  <option value="2024-03-30">March 30, 2024</option>
                </select>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Choose a time</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </div>

            <Button
              className="w-full bg-[var(--swiss-red)] hover:bg-[var(--swiss-red)]/90 text-white"
              size="lg"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}