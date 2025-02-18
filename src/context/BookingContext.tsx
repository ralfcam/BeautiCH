import { createContext, useContext, useState, ReactNode } from 'react';
import { BookingDetails } from '@/types/booking';

interface BookingContextType {
  booking: BookingDetails | null;
  createBooking: (details: BookingDetails) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  const createBooking = (details: BookingDetails) => {
    setBooking(details);
  };

  const clearBooking = () => {
    setBooking(null);
  };

  return (
    <BookingContext.Provider value={{ booking, createBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}