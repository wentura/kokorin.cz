-- Centralizované ubytovací poptávky (kokorin.cz a později další weby)
create table if not exists public.accommodation_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  site_slug text not null default 'kokorin',
  source_page text,
  source_section text,
  source_object_id text,
  date_from date,
  date_to date,
  adults integer not null default 1,
  children_3_10 integer not null default 0,
  dogs integer not null default 0,
  cats integer not null default 0,
  stay_type_filter text,
  name text,
  email text,
  phone text,
  routing_mode text,
  routing_reason text,
  payload jsonb not null default '{}'::jsonb,
  email_sent boolean not null default true,
  email_error text,
  db_error text
);

create index if not exists accommodation_leads_created_at_idx
  on public.accommodation_leads (created_at desc);

create index if not exists accommodation_leads_site_slug_idx
  on public.accommodation_leads (site_slug);

comment on table public.accommodation_leads is 'Poptávky ubytování; zápis pouze ze serveru (service role).';
