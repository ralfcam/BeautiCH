import type { Database } from './supabase';

export type Service = Omit<Database['public']['Tables']['services']['Row'], 'image_url'> & {
  image: string;
};