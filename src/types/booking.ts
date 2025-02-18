export interface BookingDetails {
  id: string;
  service: {
    id: number;
    title: string;
    price: number;
  };
  date: string;
  time: string;
  provider: {
    name: string;
    address: string;
    rating: number;
  };
  payment: {
    method: string;
    subtotal: number;
    tax: number;
    total: number;
  };
}