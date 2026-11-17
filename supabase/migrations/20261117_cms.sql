-- =====================================================================================
-- Direct2Campus admin CMS: database setup (idempotent, safe to run more than once)
--
-- Paste this whole file into the Supabase SQL editor and run it once.
--
--   site_content            one row per editable content document (published `data` + unpublished `draft`)
--   site_content_versions   publish history (the admin "restore a version" list)
--   blogs                   blog posts (created if missing, then extended with SEO columns)
--   leads                   website enquiries (created if missing; columns match src/app/api/leads)
--
-- Row Level Security is ON for site_content, site_content_versions and leads with NO public
-- policies: only the server (service-role key, which bypasses RLS) can read or write them.
-- `blogs` keeps public read access, limited to published rows.
-- =====================================================================================

-- ---- site_content ----------------------------------------------------------------
create table if not exists public.site_content (
  key         text primary key,
  data        jsonb,
  draft       jsonb,
  updated_at  timestamptz not null default now(),
  updated_by  text
);

alter table public.site_content enable row level security;

-- ---- site_content_versions -------------------------------------------------------
create table if not exists public.site_content_versions (
  id          bigserial primary key,
  key         text not null,
  data        jsonb not null,
  created_at  timestamptz not null default now(),
  created_by  text
);

create index if not exists site_content_versions_key_created_idx
  on public.site_content_versions (key, created_at desc);

alter table public.site_content_versions enable row level security;

-- ---- blogs -----------------------------------------------------------------------
create table if not exists public.blogs (
  id               text primary key,
  slug             text unique not null,
  title            text not null,
  excerpt          text,
  content          text,
  category         text default 'Admission Guide',
  author           text default 'Direct2Campus Editorial Team',
  date             text,
  read_time        text default '5 min read',
  image_url        text,
  tags             jsonb default '[]'::jsonb,
  published        boolean default true,
  seo_title        text,
  meta_description text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

alter table public.blogs add column if not exists seo            jsonb;
alter table public.blogs add column if not exists canonical_url  text;
alter table public.blogs add column if not exists og_title       text;
alter table public.blogs add column if not exists og_description text;
alter table public.blogs add column if not exists og_image       text;

alter table public.blogs enable row level security;

-- Public read access, published rows only (replaces the older "read everything" policy).
drop policy if exists "Allow public read access to blogs" on public.blogs;
create policy "Allow public read access to blogs"
  on public.blogs
  for select
  using (published is distinct from false);

drop policy if exists "Allow service role full access to blogs" on public.blogs;
create policy "Allow service role full access to blogs"
  on public.blogs
  for all
  to service_role
  using (true)
  with check (true);

-- ---- leads -----------------------------------------------------------------------
-- id is text because the site generates ids like "lead_1731800000000_ab12c" (src/app/api/leads/route.ts).
create table if not exists public.leads (
  id                 text primary key default gen_random_uuid()::text,
  name               text,
  phone              text,
  email              text,
  lead_type          text,
  interested_college text,
  message            text,
  status             text default 'New',
  notes              text,
  created_at         timestamptz default now()
);

-- In case an older leads table exists without some of these columns.
alter table public.leads add column if not exists name               text;
alter table public.leads add column if not exists phone              text;
alter table public.leads add column if not exists email              text;
alter table public.leads add column if not exists lead_type          text;
alter table public.leads add column if not exists interested_college text;
alter table public.leads add column if not exists message            text;
alter table public.leads add column if not exists status             text default 'New';
alter table public.leads add column if not exists notes              text;
alter table public.leads add column if not exists created_at         timestamptz default now();

alter table public.leads enable row level security;
-- (no policies on purpose: only the service role can access leads)
