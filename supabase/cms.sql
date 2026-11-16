-- TCoEFS: admin content management upgrade
--
-- Run this once in Supabase: SQL Editor > New query > paste > Run.
-- It is safe to run again later (every statement is idempotent).
--
-- What it does
--   1. Creates an administrator allow-list and an is_admin() check that
--      uses the GitHub identity Supabase verified (it cannot be edited by
--      the signed-in user).
--   2. Creates tables for the homepage hero pictures and the homepage figures,
--      pre-filled with what the site shows today.
--   3. Replaces the old "any signed-in user can edit" rules on every content
--      table with "administrators only". Public visitors can still read.
--
-- BEFORE YOU RUN: check the list of GitHub usernames in step 1 below.
-- If your username is missing you will not be able to save changes until you
-- add it (re-run just that INSERT).

-- ---------------------------------------------------------------- 1. admins
create table if not exists public.admin_github_users (
  username text primary key
);

insert into public.admin_github_users (username) values
  ('tikz-max')
  -- , ('another-admin-username')
on conflict do nothing;

alter table public.admin_github_users enable row level security;
-- No policies on purpose: nobody can read or edit this list through the API.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from auth.identities i
    join public.admin_github_users a
      on lower(a.username) = lower(
           coalesce(i.identity_data ->> 'user_name',
                    i.identity_data ->> 'preferred_username'))
    where i.user_id = auth.uid()
      and i.provider = 'github'
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- --------------------------------------------------------- 2. new content
create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text not null default '',
  caption text not null default '',
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists public.site_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  description text not null default '',
  value integer not null default 0,
  suffix text not null default '',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

drop trigger if exists hero_slides_updated_at on public.hero_slides;
create trigger hero_slides_updated_at before update on public.hero_slides
  for each row execute function public.set_updated_at();

drop trigger if exists site_stats_updated_at on public.site_stats;
create trigger site_stats_updated_at before update on public.site_stats
  for each row execute function public.set_updated_at();

-- Starting content (only added while the tables are empty)
insert into public.hero_slides (image_url, alt_text, caption, display_order)
select * from (values
  ('/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp',
   'Research and demonstration farmland at the University of Jos',
   'Research farmland', 1),
  ('/hero/compressed/4.jpg',
   'The TCoEFS team and visitors at the Centre''s facilities',
   'The TCoEFS team', 2),
  ('/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp',
   'Visitors at the Centre''s greenhouse complex',
   'Greenhouse complex', 3),
  ('/hero/compressed/2.jpg',
   'Partners and University of Jos leadership at an institutional engagement',
   'Institutional engagement', 4)
) as v(image_url, alt_text, caption, display_order)
where not exists (select 1 from public.hero_slides);

insert into public.site_stats (label, description, value, suffix, display_order)
select * from (values
  ('Scientific team members',
   'Researchers, faculty, and field scientists driving TCoEFS work', 30, '+', 1),
  ('Farmers trained',
   'In climate-smart agriculture and value addition practices', 500, '+', 2),
  ('Postgraduate programmes developed',
   'Accredited programmes building the next generation of food security experts', 15, '+', 3),
  ('Strategic partnerships activated',
   'With national institutions, industry, and international bodies', 10, '+', 4)
) as v(label, description, value, suffix, display_order)
where not exists (select 1 from public.site_stats);

-- ------------------------------------------------------ 3. access rules
-- Remove every existing write rule on the content tables (their names may
-- differ from the original schema file), then add administrator-only rules.
do $$
declare
  r record;
begin
  for r in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('youtube_video', 'spotlight_cards', 'upcoming_event',
                        'newsletters', 'resources', 'hero_slides', 'site_stats')
      and cmd <> 'SELECT'
  loop
    execute format('drop policy %I on public.%I', r.policyname, r.tablename);
  end loop;
end $$;

do $$
declare
  t text;
begin
  foreach t in array array['youtube_video', 'spotlight_cards', 'upcoming_event',
                           'newsletters', 'resources', 'hero_slides', 'site_stats']
  loop
    execute format('alter table public.%I enable row level security', t);

    -- public read (only created if the table has no read rule yet)
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = t and cmd = 'SELECT'
    ) then
      execute format(
        'create policy %I on public.%I for select using (true)',
        'public read ' || t, t);
    end if;

    execute format(
      'create policy %I on public.%I for insert to authenticated with check (public.is_admin())',
      'admin insert ' || t, t);
    execute format(
      'create policy %I on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())',
      'admin update ' || t, t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using (public.is_admin())',
      'admin delete ' || t, t);
  end loop;
end $$;
