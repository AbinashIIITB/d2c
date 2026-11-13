-- Supabase Blogs Table Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql) if you want a dedicated 'blogs' table.
CREATE TABLE IF NOT EXISTS public.blogs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'Admission Guide',
  author TEXT DEFAULT 'Direct2Campus Editorial Team',
  date TEXT,
  read_time TEXT DEFAULT '5 min read',
  image_url TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT true,
  seo_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blogs
CREATE POLICY "Allow public read access to blogs"
  ON public.blogs
  FOR SELECT
  USING (true);

-- Allow full access for service_role
CREATE POLICY "Allow service role full access to blogs"
  ON public.blogs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
