import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { BookingProvider } from '@/context/BookingContext';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import BookingConfirmationPage from '@/pages/BookingConfirmationPage';
import AboutPage from '@/pages/AboutPage';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <BookingProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/service/:id" element={<ServiceDetailPage />} />
                  <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </main>
              <Toaster />
            </div>
          </Router>
        </BookingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App