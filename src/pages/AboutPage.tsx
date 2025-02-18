import { Info, Leaf, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About EcoBeauty</h1>
          <p className="text-lg text-muted-foreground">
            Connecting you with sustainable beauty and wellness services across Switzerland.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-card rounded-lg p-8 shadow-sm mb-8">
          <div className="flex items-center mb-4">
            <Leaf className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-muted-foreground">
            We're committed to promoting eco-friendly beauty practices while making it easy
            for you to discover and book sustainable beauty services. Our platform connects
            conscious consumers with certified green beauty professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">
              Join a growing community of eco-conscious beauty enthusiasts
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Sustainability</h3>
            <p className="text-sm text-muted-foreground">
              All services are certified eco-friendly and sustainable
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Transparency</h3>
            <p className="text-sm text-muted-foreground">
              Clear information about services, pricing, and certifications
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-card rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            Have questions or suggestions? We'd love to hear from you.
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Email:</span> contact@ecobeauty.ch
            </p>
            <p className="text-sm">
              <span className="font-medium">Phone:</span> +41 XX XXX XX XX
            </p>
            <p className="text-sm">
              <span className="font-medium">Address:</span> Bahnhofstrasse 100, 8001 Zürich
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}