-- Anonymous counts from the three website interactive tools (Starting Point Finder,
-- See What's Inside, Programme Finder): what people choose, with no names or emails.
create table if not exists tool_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tool text not null,
  event text not null,
  choices jsonb not null default '{}'::jsonb
);

create index if not exists tool_events_tool_created on tool_events (tool, created_at desc);

-- Only the website's server (service role key) can add and read rows.
alter table tool_events enable row level security;
grant select, insert on table public.tool_events to service_role;
