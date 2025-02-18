import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, Leaf, Globe, User, ChevronDown,
  Search, ShoppingBag, Heart 
} from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
];

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Services' },
  { href: '/eco-friendly', label: 'Eco-Friendly Salons' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const isAuthenticated = false; // Replace with actual auth state

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Main Navigation Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-colors hover:text-[var(--swiss-red)]"
          >
            <Leaf className="h-6 w-6 text-[var(--swiss-red)]" />
            <span className="beautich-logo-text text-xl hidden sm:inline-block">
              BeautiCH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm">
                <Globe className="h-4 w-4" />
                <span>{languages.find(l => l.code === currentLanguage)?.label}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={cn(
                      "cursor-pointer",
                      currentLanguage === lang.code && "bg-accent"
                    )}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/bookings" className="flex items-center w-full">
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/favorites" className="flex items-center w-full">
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <CTAButton
                variant="primary"
                size="sm"
                label="Sign in or create account"
              >
                Sign In
              </CTAButton>
            )}

            {/* Book Now CTA */}
            <CTAButton
              variant="primary"
              size="sm"
              label="Book a service"
            >
              Book Now
            </CTAButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Mobile Quick Actions */}
            <button className="text-foreground/60 hover:text-foreground">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-foreground/60 hover:text-foreground">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-foreground/60 hover:text-foreground">
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/60 hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block py-2 text-foreground/60 hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Language Selector */}
            <div className="py-2 border-t">
              <p className="text-sm font-medium text-foreground/60 mb-2">
                Language
              </p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={cn(
                      "py-2 px-4 text-sm rounded-md",
                      currentLanguage === lang.code
                        ? "bg-accent text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="space-y-2 border-t pt-4">
              {!isAuthenticated && (
                <CTAButton
                  variant="outline"
                  fullWidth
                  label="Sign in or create account"
                >
                  Sign In
                </CTAButton>
              )}
              <CTAButton
                variant="primary"
                fullWidth
                label="Book a service"
              >
                Book Now
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}