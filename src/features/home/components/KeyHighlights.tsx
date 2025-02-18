import { Award, Sparkles, Wand2, Globe, Users, Shield } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const highlights = [
  {
    icon: Award,
    title: "Green Badge™ Certified",
    description: "Book from our curated selection of eco-certified beauty services",
    color: "forest-green",
    action: "View Certified Services",
    path: "/eco-friendly"
  },
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description: "Get personalized service suggestions based on your preferences",
    color: "swiss-red",
    action: "Get Recommendations",
    path: "/recommendations"
  },
  {
    icon: Wand2,
    title: "Virtual Try-On",
    description: "Preview hairstyles and makeup with our AR technology",
    color: "forest-green",
    action: "Try Virtual Styling",
    path: "/virtual-try-on"
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Services available in German, French, Italian, and English",
    color: "swiss-red",
    action: "Change Language",
    path: "/settings/language"
  },
  {
    icon: Users,
    title: "Verified Professionals",
    description: "All service providers are thoroughly vetted and certified",
    color: "forest-green",
    action: "Meet Our Professionals",
    path: "/professionals"
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Safe and secure payment processing with booking protection",
    color: "swiss-red",
    action: "Learn About Safety",
    path: "/safety"
  }
];

export function KeyHighlights() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-accent/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Future of Sustainable Beauty
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our innovative features that make finding and booking eco-friendly beauty services easier than ever
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card 
              key={index} 
              className={`
                relative overflow-hidden transition-all hover:shadow-lg border-[var(--light-gray)]
                group hover:border-[var(--${highlight.color})]
              `}
            >
              {/* Decorative Background Circle */}
              <div 
                className={`
                  absolute top-0 right-0 w-32 h-32 rounded-full 
                  bg-[var(--${highlight.color})] opacity-5 -mr-16 -mt-16
                  group-hover:scale-150 transition-transform duration-500
                `} 
              />

              <CardHeader>
                <div 
                  className={`
                    w-12 h-12 rounded-full bg-[var(--${highlight.color})]/10 
                    flex items-center justify-center mb-4
                    group-hover:scale-110 transition-transform duration-300
                  `}
                >
                  <highlight.icon className={`h-6 w-6 text-[var(--${highlight.color})]`} />
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-[var(--${highlight.color})] transition-colors">
                  {highlight.title}
                </CardTitle>
                <CardDescription>{highlight.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <CTAButton 
                  variant={highlight.color === "forest-green" ? "secondary" : "primary"}
                  fullWidth
                  onClick={() => navigate(highlight.path)}
                  label={highlight.action}
                >
                  {highlight.action}
                </CTAButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}