import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, Calendar, Mail, Download, Star, MapPin, 
  CreditCard, Shield, AlertCircle 
} from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import { useBooking } from '@/context/BookingContext';

export default function BookingConfirmationPage() {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Redirect to search if no booking exists
  if (!booking) {
    navigate('/search');
    return null;
  }

  const handleAddToCalendar = () => {
    const event = {
      text: `${booking.service.title} at ${booking.provider.name}`,
      dates: `${booking.date} ${booking.time}`,
      location: booking.provider.address,
    };

    // Format for Google Calendar
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.text
    )}&dates=${encodeURIComponent(event.dates)}&location=${encodeURIComponent(
      event.location
    )}`;

    window.open(googleUrl, '_blank');
    toast.success('Opening calendar...');
  };

  const handleEmailConfirmation = () => {
    setIsEmailSent(true);
    toast.success('Confirmation email sent!');
  };

  const handleDownloadReceipt = () => {
    toast.success('Downloading receipt...');
  };

  const handleConfirmBooking = () => {
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    toast.success('Booking confirmed successfully!');
    // Additional confirmation logic here
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="bg-[var(--forest-green)] text-white w-8 h-8 rounded-full flex items-center justify-center">
                1
              </div>
              <span className="ml-2 text-sm font-medium">Service Selection</span>
            </div>
            <div className="h-px w-16 bg-[var(--forest-green)]" />
            <div className="flex items-center">
              <div className="bg-[var(--forest-green)] text-white w-8 h-8 rounded-full flex items-center justify-center">
                2
              </div>
              <span className="ml-2 text-sm font-medium">Booking Details</span>
            </div>
            <div className="h-px w-16 bg-[var(--forest-green)]" />
            <div className="flex items-center">
              <div className="bg-[var(--swiss-red)] text-white w-8 h-8 rounded-full flex items-center justify-center">
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Almost Done!</h1>
          <p className="text-muted-foreground">
            Please review your booking details and confirm
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Booking reference: {booking.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Service Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{booking.service.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Provider</p>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{booking.provider.name}</span>
                      <div className="flex items-center text-sm text-yellow-500">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        {booking.provider.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Date and Location */}
              <div className="space-y-2">
                <h3 className="font-semibold">Appointment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <p className="font-medium">{booking.provider.address}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Payment Information</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Paid with: {booking.payment.method}
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Price</span>
                    <span>CHF {booking.payment.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (8%)</span>
                    <span>CHF {booking.payment.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>CHF {booking.payment.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment and Confirmation */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 border rounded-lg bg-accent/50">
                    <CreditCard className="h-5 w-5 mr-2 text-[var(--swiss-red)]" />
                    <div className="flex-1">
                      <p className="font-medium">Credit Card</p>
                      <p className="text-sm text-muted-foreground">Ending in 1234</p>
                    </div>
                    <Shield className="h-5 w-5 text-[var(--forest-green)]" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is securely encrypted
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Cancellation */}
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="cancellation">
                    <AccordionTrigger>Cancellation Policy</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        Free cancellation up to 24 hours before your appointment. 
                        Late cancellations may incur a fee of 50% of the service price.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label 
                    htmlFor="terms"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to the terms and conditions
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <CTAButton
                  fullWidth
                  onClick={handleConfirmBooking}
                  disabled={!agreedToTerms}
                  label="Confirm booking"
                >
                  Confirm Booking
                </CTAButton>

                <div className="grid grid-cols-3 gap-4">
                  <CTAButton
                    variant="outline"
                    onClick={handleAddToCalendar}
                    label="Add to calendar"
                  >
                    <Calendar className="h-4 w-4" />
                  </CTAButton>
                  <CTAButton
                    variant="outline"
                    onClick={handleEmailConfirmation}
                    disabled={isEmailSent}
                    label="Email confirmation"
                  >
                    <Mail className="h-4 w-4" />
                  </CTAButton>
                  <CTAButton
                    variant="outline"
                    onClick={handleDownloadReceipt}
                    label="Download receipt"
                  >
                    <Download className="h-4 w-4" />
                  </CTAButton>
                </div>
              </CardFooter>
            </Card>

            {/* Support Information */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Need help? Contact our support team</p>
              <p className="mt-1">
                <a
                  href="mailto:support@ecobeauty.ch"
                  className="text-[var(--swiss-red)] hover:underline"
                >
                  support@ecobeauty.ch
                </a>{' '}
                or call{' '}
                <a 
                  href="tel:+41XXXXXXXXX" 
                  className="text-[var(--swiss-red)] hover:underline"
                >
                  +41 XX XXX XX XX
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}