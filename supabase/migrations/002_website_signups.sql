-- Backup copy of every website form: early access, newsletter, Starting Point Finder and contact.
-- Mailchimp stays the main list; this table means nobody is lost if Mailchimp is full or down.
create table if not exists website_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form text not null,
  email text not null,
  first_name text,
  last_name text,
  details jsonb not null default '{}'::jsonb
);

create index if not exists website_signups_form_created on website_signups (form, created_at desc);

-- Row level security on with no policies: only the website's server (service role key) can read or write.
alter table website_signups enable row level security;

-- Supabase no longer gives new tables to its API roles automatically, so let the
-- website's server (service_role, the secret key) add and read rows. The public keys get nothing.
grant select, insert on table public.website_signups to service_role;
