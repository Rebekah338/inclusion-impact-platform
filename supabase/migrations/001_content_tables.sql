-- Site content: key/value store for homepage and page copy
create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  key text not null,
  value text not null,
  updated_at timestamptz default now(),
  unique(page, key)
);

-- Testimonials
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  organisation text,
  active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Client logos
create table if not exists client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  active boolean default true,
  sort_order integer default 0
);

-- FAQs
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  question text not null,
  answer text not null,
  sort_order integer default 0,
  active boolean default true
);

-- Podcast episodes
create table if not exists podcast_episodes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text,
  duration text,
  episode_url text,
  published_at date,
  active boolean default true,
  sort_order integer default 0
);

-- Blog posts
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  body text,
  category text,
  slug text unique,
  published_at date,
  active boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
alter table site_content enable row level security;
alter table testimonials enable row level security;
alter table client_logos enable row level security;
alter table faqs enable row level security;
alter table podcast_episodes enable row level security;
alter table blog_posts enable row level security;

-- Public read policies (website visitors can read content)
create policy "Public can read site_content" on site_content for select using (true);
create policy "Public can read testimonials" on testimonials for select using (active = true);
create policy "Public can read client_logos" on client_logos for select using (active = true);
create policy "Public can read faqs" on faqs for select using (active = true);
create policy "Public can read podcast_episodes" on podcast_episodes for select using (active = true);
create policy "Public can read blog_posts" on blog_posts for select using (active = true);
