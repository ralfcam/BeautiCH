/*
  # Create services table and initial data

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `rating` (numeric)
      - `image_url` (text)
      - `price` (numeric)
      - `location` (text)
      - `availability` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `services` table
    - Add policy for public read access
    - Add policy for authenticated users to manage their own services
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  rating numeric NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  price numeric NOT NULL,
  location text NOT NULL,
  availability text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own services" ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own services" ON services
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial data
INSERT INTO services (title, description, rating, image_url, price, location, availability) VALUES
  (
    'Eco-Friendly Hair Salon',
    'Sustainable hair care using organic products',
    4.8,
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400&h=300',
    85,
    'Zürich',
    'Today'
  ),
  (
    'Natural Spa Experience',
    'Holistic wellness with natural ingredients',
    4.9,
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=400&h=300',
    120,
    'Geneva',
    'Tomorrow'
  ),
  (
    'Organic Skincare Studio',
    'Premium organic facial treatments',
    4.7,
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400&h=300',
    95,
    'Basel',
    'Next Week'
  ),
  (
    'Eco Massage Therapy',
    'Therapeutic massage using sustainable products',
    4.9,
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400&h=300',
    110,
    'Bern',
    'Today'
  ),
  (
    'Green Nail Studio',
    'Non-toxic nail care and treatments',
    4.6,
    'https://images.unsplash.com/photo-1610992015732-2449b0c26670?auto=format&fit=crop&q=80&w=400&h=300',
    65,
    'Lausanne',
    'Tomorrow'
  ),
  (
    'Sustainable Beauty Bar',
    'Full-service eco beauty treatments',
    4.8,
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400&h=300',
    90,
    'Zürich',
    'Next Week'
  );