create schema if not exists private;

create table if not exists public.event_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.event_admins enable row level security;

create or replace function private.is_event_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.event_admins a
    where a.user_id = (select auth.uid())
  );
$$;

drop policy if exists "admins read admin list" on public.event_admins;

create policy "admins read admin list"
on public.event_admins
for select
to authenticated
using (private.is_event_admin());
